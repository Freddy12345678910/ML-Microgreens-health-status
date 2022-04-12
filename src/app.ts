import {
  SerialPort,
  SerialPortOpenOptions,
  ReadlineParser,
  ReadlineOptions,
} from "serialport";
import { AutoDetectTypes } from "@serialport/bindings-cpp";

import admin from "firebase-admin";

import { Arduino } from "./types/types";

export class App implements Arduino.App {
  readonly port: SerialPort<AutoDetectTypes>;
  readonly parser: ReadlineParser;

  constructor(
    portConfig: SerialPortOpenOptions<AutoDetectTypes>,
    parserConfig?: ReadlineOptions
  ) {
    this.port = new SerialPort({ ...portConfig, autoOpen: false });
    this.parser = new ReadlineParser(parserConfig);
    this.pipeParser();
    this.applyListeners();
  }

  private pipeParser(): void {
    this.port.pipe(this.parser);
  }

  private applyListeners(): void {
    this.port.on("open", () => {
      console.log("Connection success");
    });

    this.port.on("error", function (err) {
      console.log("Error: ", err.message);
    });
  }

  setDataListener(listener: Arduino.DataListener): void {
    this.parser.on("data", listener);
  }

  connectDB(): admin.app.App | void {
    try {
      const dbConnection = admin.initializeApp();
      return dbConnection;
    } catch (error) {
      console.log(error);
    }
  }

  init(): void {
    this.port.open();
  }
}
