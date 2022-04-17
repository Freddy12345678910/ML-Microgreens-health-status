import { App } from "./app";
import * as dotenv from "dotenv";
dotenv.config();

import admin, { firestore } from "firebase-admin";

import { SmartGreenHouse } from "./types/types";

(function __init__() {
  const app = new App({
    path: <string>process.env.SERIAL_PORT,
    baudRate: parseInt(<string>process.env.BAUD_RATE),
  });

  const db = <admin.firestore.Firestore>app.connectDB();
  
  app.setDataListener(async (data: Buffer) => {
    try {
      const parsedData = <SmartGreenHouse.VegetationIndex>(
        JSON.parse(data.toString())
      );
      const dataInserts = Object.keys(parsedData).map((key) =>
        db.collection(key).add({
          value: parsedData[<keyof SmartGreenHouse.VegetationIndex>key],
          created_at: firestore.Timestamp.fromDate(new Date())
        })
      );
      await Promise.all(dataInserts);
    } catch (error) {
      throw error;
    }
  });

  app.init();
})();
