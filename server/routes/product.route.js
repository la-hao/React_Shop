import { Router } from "express";
import data from "../data.js";

const router = Router();

router.get('/', (req, res) => {
  res.send(data.products);
});

router.get('/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  }
  else {
    res.status(404).send({ message: "Product not Found!" });
  }
})

export default router;