import express from "express";
import morgan from "morgan";
// Routes
import userRoutes from "./routes/user";

const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

export default app;