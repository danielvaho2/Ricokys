import express from "express";
import cors from "cors";

//mis routes sin chatgpt
import productosRoutes from './routes/ventas/productosRoutes.js'
import turnosRoutes from './routes/ventas/turnoRoutes.js'
import ventasRoutes from "./routes/ventas/ventasRoutes.js";
import detalleVentas from './routes/detalleVentaRoutes.js'
import insertarRoutes from "./routes/crud.routes.js";
import filtroRoutes from './routes/dashboard/filtroRoutes.js'
import fichoRoutes from "./routes/fichos/fichoRoutes.js";
 
import { errorHandler } from "./middlewares/errorHandler.js";
import { pool } from "./db/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/filtro',filtroRoutes);
app.use('/ficho',fichoRoutes);
app.use("/productos", productosRoutes);
app.use("/turno", turnosRoutes);
app.use("/ventas", ventasRoutes);
app.use("/productos", insertarRoutes);
app.use('/detalle',detalleVentas);
app.get("/test", async (req, res) => {
  const result = await pool.request().query("SELECT * FROM Productos");
  res.json(result.recordset);
});

app.use(errorHandler);

export default app;
