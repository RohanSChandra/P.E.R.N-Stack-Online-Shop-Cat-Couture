import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className={`${styles.footer} ${styles.pagePadding} ${styles.sectionPadding}`}
    >
      <p className={styles.footerItem}>Copyright Placeholder</p>
      <Link to="/" className={styles.footerItem}>
        Terms of use
      </Link>
      <Link to="/" className={styles.footerItem}>
        Privacy policy
      </Link>
    </footer>
  );
};

export default Footer;
