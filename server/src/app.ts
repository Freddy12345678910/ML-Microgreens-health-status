import {
  SerialPort,
  SerialPortOpenOptions,
  ReadlineParser,
  ReadlineOptions,
} from "serialport";
import * as dotenv from 'dotenv'
dotenv.config();
import { ObjectId } from "mongodb";
import * as mongoDB from "mongodb";
import express, { NextFunction, Request, Response } from "express";
import { Sequelize } from 'sequelize-typescript'

import { AutoDetectTypes } from "@serialport/bindings-cpp";

import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

import { Arduino } from "./types/types";
const app = express();
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

  init(): void {
    this.port.open();
}
//export default class indextest {
  //constructor(
    //public name: string,
    //public price: number,
    //public category: string,
    //public id?: ObjectId
  //) {}
}

export const collections: { indextest?: mongoDB.Collection } = {};
