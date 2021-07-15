import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import productModel from '../models/product.model.js';

const router = Router();

router.get('/', expressAsyncHandler(async (req, res) => {
  const products = await productModel.find({});
  res.send(products);
})
);

router.get('/seed', expressAsyncHandler(async (req, res) => {
  //await productModel.remove({});
  const createProducts = await productModel.insertMany(data.products);
  res.send({ createProducts });
}))

router.get('/:id', expressAsyncHandler(async (req, res) => {
  const product = await productModel.findOne({ _id: req.params.id });

  if (product) {
    res.send(product);
  }
  else {
    res.status(404).send({ message: "Product not Found!" });
  }
})
);

export default router;