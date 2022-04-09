import {
  SerialPort,
  SerialPortOpenOptions,
  ReadlineParser,
  ReadlineOptions,
} from "serialport";
import { AutoDetectTypes } from "@serialport/bindings-cpp";

import { Arduino } from "./types/types";

export class App implements Arduino.App {
  port: SerialPort<AutoDetectTypes>;
  parser: ReadlineParser;

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

  setDataListener(fn: Arduino.DataListener) {
    this.parser.on("data", fn);
  }

  init(): void {
    this.port.open();
  }
}
