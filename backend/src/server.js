import app from "./app.js";
import { pool } from "./db/db.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await pool.request().query("SELECT 1");
    console.log("✅ DB conectada");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ No se pudo conectar a la DB:", err.message);
    process.exit(1);
  }
}

main();