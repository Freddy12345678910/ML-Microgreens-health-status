import express from "express";
import { pool } from "./database.config";

const webApp = express();
webApp.use(express.json());

webApp.get("/api/projects", function (req: any, res: any) {
  pool.connect(function (err: any, client: any, done: any) {
    client
      .query("SELECT id, nombre, fechainicio FROM public.proyecto")
      .then((projects: any) => {
        res.json(projects.rows);
      })
      .catch((e: any) => {
        res.status(500).json(e);
      });
  });
});

webApp.get("/api/trays/:id", function (req: any, res: any) {
  const trayId = req.params.id;
  pool.connect(function (err: any, client: any, done: any) {
    client
      .query(
        `SELECT idbandeja as idBandeja, comentario as comentarioCultivo, comentarios as comentarioBandeja FROM bandeja 
      INNER JOIN tipocultivo ON tipocultivo.idtipocultivo = bandeja.idtipocultivo WHERE idproyecto = $1;`,
        [trayId]
      )
      .then((projects: any) => {
        res.json(projects.rows);
      })
      .catch((e: any) => {
        res.status(500).json(e);
      });
  });
});

webApp.get("/api/trays", function (req: any, res: any) {
  pool.connect(function (err: any, client: any, done: any) {
    client
      .query(
        `SELECT idbandeja as idBandeja, comentario as comentarioCultivo, comentarios as comentarioBandeja FROM bandeja 
      INNER JOIN tipocultivo ON tipocultivo.idtipocultivo = bandeja.idtipocultivo;`
      )
      .then((projects: any) => {
        res.json(projects.rows);
      })
      .catch((e: any) => {
        res.status(500).json(e);
      });
  });
});

webApp.post("/api/trays", function (req: any, res: any) {
  var body = req.body;
  pool.connect(function (err: any, client: any, done: any) {
    client
      .query(
        `INSERT INTO public.bandeja(idtipocultivo, comentarios, idproyecto) VALUES ($1, $2, $3)`,
        [body.idtipocultivo, body.comentarios, body.idproyecto]
      )
      .then((projects: any) => {
        res.status(201);
      })
      .catch((e: any) => {
        res.status(500).json(e);
      });
  });
});

export function startWebServer() {
  var webAppPort = 3000;
  webApp.listen(webAppPort, function () {
    console.log(`Starting web application server on port ${webAppPort}`);
  });
}
