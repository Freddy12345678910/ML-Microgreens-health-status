import { SerialPort, ReadlineParser } from "serialport";

namespace Arduino {
  export interface App {
    port: SerialPort;
    parser: ReadlineParser;
    setDataListener(listener: DataListener): void;
    init(): void;
  }

  export type DataListener = (...args: any[]) => void;
}

namespace SmartGreenHouse {
  export type VegetationIndex = Record<VegetationKey, number>;
  
  export type VegetationKey = 'NDWI' | 'NDVI' | 'ARVI';
}
