import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
const app = express();

dotenv.config();
connectDB();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.disable("X-Powered-By:");
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running on port ${PORT}`));
