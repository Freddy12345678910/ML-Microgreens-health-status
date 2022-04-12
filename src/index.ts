import { App } from "./app";
import * as dotenv from "dotenv";
dotenv.config();

import admin from "firebase-admin";

import { SmartGreenHouse } from "./types/types";

(async function __init__() {
  const app = new App({
    path: <string>process.env.SERIAL_PORT,
    baudRate: parseInt(<string>process.env.BAUD_RATE),
  });

  const db = <admin.firestore.Firestore>app.connectDB();

  db.collection("NDWI").onSnapshot((NDWI) => {
    console.log(NDWI.docs[NDWI.docs.length - 1].data());
  });

  app.setDataListener(function (data: Buffer) {
    try {
      const { type, value } = <SmartGreenHouse.VegetationIndex>(
        JSON.parse(data.toString())
      );
      db.collection(type).add({
        value
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.init();
})();
