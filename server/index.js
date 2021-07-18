import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import orderRouter from "./routes/order.route.js";
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();
const app = express();
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send({ message: "Hello" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`App listening at PORT ${PORT}`);
});
