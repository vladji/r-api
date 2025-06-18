import express from "express";
import compression from "compression";
import cors from "cors";
import { connectToDB } from "./db";

const app = express();

const PORT = 3001;

app.use(compression());
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "https://kit-food.net"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
