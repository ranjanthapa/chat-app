import express from "express";
import cors from "cors";
import userRoute from "./routes/user.route";
import authRoute from "./routes/auth.route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/users", userRoute);
app.use("/auth", authRoute);

export default app;
