import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import listRoutes from "./Routes/listRoutes.js";

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173'
}));



dotenv.config();

const PORT = process.env.PORT || 2500;
const DBURL = process.env.DATABASE_URL;

mongoose.connect(DBURL).then(() => {
  console.log("Database Connected Successfully");
  app.listen(PORT, () => {
    console.log(`Database Connected Using Port ${PORT}`);
  });
});

app.use("/api", listRoutes);
