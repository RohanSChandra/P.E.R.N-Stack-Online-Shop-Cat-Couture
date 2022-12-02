const express = require("express");
const Joi = require("joi");
const router = express.Router();
const queryParamValidationMiddleware = require("../middleware/queryParamValidationMiddleware");
const productRepository = require("./product.repository");

const queryParamsSchema = Joi.object().keys({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
});

router.get(
  "/",
  queryParamValidationMiddleware(queryParamsSchema),
  async (req, res, next) => {
    try {
      const { limit, page } = req.query;

      const safeLimit = limit ? parseInt(limit) : 10;
      const safePage = parseInt(page) ? parseInt(page) : 1;

      const allProducts = await productRepository.getTotalProducts();
      const products = await productRepository.getProducts(safeLimit, safePage);

      const pageResult = {
        products,
        currentPage: safePage,
        itemsPerPage: safeLimit,
        totalItems: allProducts.length,
        totalPages: Math.ceil(parseInt(allProducts.length) / 10),
      };
      return res.json(pageResult);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
