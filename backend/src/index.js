import "dotenv/config";

import express from "express";
import cors from "cors";
import { connectDB } from "./db/db.js";
import { router as partialLeadRouter } from "./routes/partialLeadRoutes.js";
import { router as userRouter } from "./routes/userRoutes.js";
import { router as leadRouter } from "./routes/leadRoutes.js";

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/partiallead", partialLeadRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/lead", leadRouter);

app.get("/", (req, res) => {
  res.send("server on");
});

app.post("/api/v1/verify", (req, res) => {});

const start = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
  });
};

start();
