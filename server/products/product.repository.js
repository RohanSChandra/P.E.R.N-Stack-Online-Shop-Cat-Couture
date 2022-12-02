const pool = require("../db");

const getAllProductsSQL = `SELECT
p.id,
p.name,
p.description,
p.price,
pc.name AS "categoryName",
pi.name AS "imageName",
pi.description AS "imageDescription",
pd.value AS "discountValue",
dt.type AS "discountType"
FROM product p
LEFT JOIN product_discount pd ON p.id = pd.product_id
LEFT JOIN discount_type dt ON dt.id = pd.discount_type_id
LEFT JOIN product_category pc ON p.product_category_id = pc.id
LEFT JOIN product_image pi ON p.product_image_id = pi.id
ORDER BY
p.id`;

const getPagedProductsSQL = `SELECT
p.id,
p.name,
p.description,
p.price,
pc.name AS "categoryName",
pi.name AS "imageName",
pi.description AS "imageDescription",
pd.value AS "discountValue",
dt.type AS "discountType"
FROM product p
LEFT JOIN product_discount pd ON p.id = pd.product_id
LEFT JOIN discount_type dt ON dt.id = pd.discount_type_id
LEFT JOIN product_category pc ON p.product_category_id = pc.id
LEFT JOIN product_image pi ON p.product_image_id = pi.id
ORDER BY
p.id
LIMIT $1
OFFSET $2
`;

const catCouture = {
  getTotalProducts: async () => {
    try {
      const { rows } = await pool.query(getAllProductsSQL);
      return rows;
    } catch (error) {
      throw Error(error);
    }
  },

  getProducts: async (limit, page) => {
    try {
      if (page <= 0 || !page) {
        throw new Error("page number must greater than 0");
      }

      const offset = limit * (page - 1);

      const { rows } = await pool.query(getPagedProductsSQL, [limit, offset]);
      return rows;
    } catch (error) {
      throw Error(error);
    }
  },
};

module.exports = catCouture;
