import { App } from "./app";
import * as dotenv from "dotenv";
dotenv.config();

(function __init__() {
  const app = new App({
    path: <string>process.env.SERIAL_PORT,
    baudRate: parseInt(<string>process.env.BAUD_RATE),
  });

  const dbConnection = app.connectDB();
  
  app.setDataListener(function (data: Buffer) {
    try {
      const dataStr = JSON.stringify(data);
      console.log(JSON.parse(dataStr));
    } catch (error) {
      console.log(error);
    }
  });

  app.init();
})();
