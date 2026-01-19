import express from "express";
import connectDB from "./database";
import accountsRouter from "./apis/accounts/accounts.routes";
import dotenv from "dotenv"

const app = express();
const PORT = 8000;
dotenv.config()

app.use(express.json());
app.use("/accounts", accountsRouter);

connectDB();
app.listen(PORT, () => {
  console.log("Server running on http://localhost:8000");
});
