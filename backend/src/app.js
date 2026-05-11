import express from "express";
import cors from "cors";

import ventasRoutes from "./routes/ventasRoutes.js";
import insertarRoutes from "./routes/crud.routes.js";

//mis routes sin chatgpt
import productosRoutes from './routes/productosRoutes.js'
import turnosRoutes from './routes/turnoRoutes.js'
import { errorHandler } from "./middlewares/errorHandler.js";
import { pool } from "./db/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/productos", productosRoutes);
app.use("/turno", turnosRoutes);
app.use("/ventas", ventasRoutes);
app.use("/productos", insertarRoutes);
app.get("/test", async (req, res) => {
  const result = await pool.request().query("SELECT * FROM Productos");
  res.json(result.recordset);
});

app.use(errorHandler);

export default app;
