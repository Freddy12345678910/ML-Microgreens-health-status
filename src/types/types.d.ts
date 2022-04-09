import { SerialPort, ReadlineParser } from "serialport";

namespace Arduino {
  export interface App {
    port: SerialPort;
    parser: ReadlineParser;
    init(): void;
  }

  export type DataListener = (...args: any[]) => void;
}
