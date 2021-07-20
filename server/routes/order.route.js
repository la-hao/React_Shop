import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/order.model.js";
import { isAuth } from "../utils.js";
const orderRouter = express.Router();

//Config
orderRouter.get(
  "/reset",
  expressAsyncHandler(async (req, res) => {
    await Order.remove({});
    res.send({ message: "Order deleted" });
  })
);

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems?.length === 0) {
      res.status(400).send({ message: "Cart is empty !" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsCost: req.body.itemsCost,
        shippingCost: req.body.shippingCost,
        taxCost: req.body.taxCost,
        totalCost: req.body.totalCost,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res.status(201).send(createdOrder);
    }
  })
);

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orderList = await Order.find({ user: req.user._id });
    res.send(orderList);
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;
