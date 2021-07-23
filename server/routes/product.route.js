import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/product.model.js";
import productModel from "../models/product.model.js";

const router = Router();

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || "";
    const category = req.query.category || "";
    const order = req.query.order || "";
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };

    const count = await productModel.countDocuments({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });

    const products = await productModel
      .find({
        ...nameFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
      })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.send({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      count: count,
    });
  })
);

router.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const data = await productModel.find({}).distinct("category");
    res.send(data);
  })
);

router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await productModel.remove({});
    const createProducts = await productModel.insertMany(data.products);
    res.send({ createProducts });
  })
);

router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await productModel.findOne({ _id: req.params.id });

    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not Found!" });
    }
  })
);

export default router;
