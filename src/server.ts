import express from "express";
import compression from "compression";
import cors from "cors";

const app = express();

app.use(compression());

app.use(cors({
  origin: ["http://localhost:5173", "https://kit-food.net"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
