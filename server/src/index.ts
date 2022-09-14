import { App } from "./app";

import { SmartGreenHouse } from "./types/types";
import client, { Channel, Connection, ConsumeMessage } from "amqplib";
import MyWebSocketServer from "./websocket.server";
import { startWebServer } from "./web.server";
import { pool } from "./database.config";

async function getRabbitMqConnection() {
  return await client.connect("amqp://guest:guest@localhost");
}

async function listenForProcessedBands() {
  const rabbitMqConnection: Connection = await getRabbitMqConnection();
  const channel: Channel = await rabbitMqConnection.createChannel();
  const consumer =
    (channel: Channel) =>
    (msg: ConsumeMessage | null): void => {
      if (msg) {
        try {
          MyWebSocketServer.emit("data", msg.content.toString());
          channel.ack(msg);
        } catch (e) {
          console.log(
            `Error while emitting data to the frontend. The data = ${msg} won't be acknowledge.`
          );
        }
      }
    };

  await channel.consume("datos.procesados", consumer(channel));
}

(function __init__() {
  const app = new App({
    path: <string>process.env.SERIAL_PORT,
    baudRate: parseInt(<string>process.env.BAUD_RATE),
  });

  const publisherConnection: Promise<Connection> = getRabbitMqConnection();

  app.setDataListener(async (data: Buffer) => {
    try {
      const parsedData = <SmartGreenHouse.VegetationIndex>(
        JSON.parse(data.toString())
      );
      var dataAsJson = JSON.parse(data.toString());

      // Salvar aqui en la base de datos...
      // Puedes convertir el contenido del mensaje
      // de alguna forma a un object, parsearlo y luego
      // mandarlo a tu base de datos.
      // (Aplica si quieres guardar la informacion de las bandas)
      const channel: Channel = await (
        await publisherConnection
      ).createChannel();
      channel.sendToQueue("datos.sensor.espectral", Buffer.from(data));
      channel.close();
    } catch (error) {
      throw error;
    }
  });
  app.init();
  listenForProcessedBands();
  startWebServer();

  MyWebSocketServer.on("receiver", (msg) => {
    console.log(`Data came as: ${msg}`);
    const js = JSON.parse(msg);
    pool.connect((err: any, client: any, done: any) => {
      client
        .query(
          `INSERT INTO public.bandas(idbandejas, a,b,c,d,e,f,g,h,r,i,s,j,t,u,v,w,k,l,tiempo) VALUES ($1, $2, $3, $4, $5, $6, $7,  $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`,
          [
            js.idbandejas,
            js.a,
            js.b,
            js.c,
            js.d,
            js.e,
            js.f,
            js.g,
            js.h,
            js.r,
            js.i,
            js.s,
            js.j,
            js.t,
            js.u,
            js.v,
            js.w,
            js.k,
            js.k,
            js.l,
            js.tiempo,
          ]
        )
        .then((projects: any) => {
          console.log(`${projects}`);
        }).catch,
        (e: any) => {
          console.log(`${e}`);
        };
    });
  });
})();
