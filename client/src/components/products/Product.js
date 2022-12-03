import styles from "./Product.module.css";
import DiscountBadge from "./DiscountBadge";

const Product = ({
  name,
  description,
  price,
  imageName,
  imageDescription,
  discountType,
  discountValue,
}) => {
  return (
    <li
      className={
        discountType && discountValue
          ? `${styles.product} ${styles.discountedProduct}`
          : styles.product
      }
    >
      <div className="card">
        <div>
          {imageName ? (
            <img
              src={`./img/${imageName}`}
              alt={imageDescription}
              className={styles.productImage}
            />
          ) : (
            <img
              src="./img/cat-photo-default.jpg"
              alt="Default product cat"
              className={styles.productImage}
            />
          )}
          {discountValue && discountType && (
            <DiscountBadge
              className={styles.badge}
              discountValue={discountValue}
              discountType={discountType}
            />
          )}
        </div>
        <h2 className={styles.productName}>{name}</h2>
        <p className={styles.priceTag}>Price: {price}</p>
        <p data-testid="product-description">{description}</p>
        <button className={styles.productButton}>Add to Cart</button>
      </div>
    </li>
  );
};

export default Product;
