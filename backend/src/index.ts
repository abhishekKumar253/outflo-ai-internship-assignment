import express from "express";
import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
    });
  }
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
