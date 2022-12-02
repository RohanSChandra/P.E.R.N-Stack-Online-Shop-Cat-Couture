import { useEffect, useState } from "react";
import api from "../../api";
import ProductList from "./ProductList";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import PaginationControls from "./PaginationControls";
import styles from "../../index.module.css";

const ProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const defaultLimit = 10;

  useEffect(() => {
    // We use AbortController (https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
    // to clean up so that we don’t introduce a memory leak
    // (https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup)
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await api.getProducts(defaultLimit, currentPage);
        if (!result.ok) {
          throw new Error("API Error");
        }
        const data = await result.json();
        if (!abortController.signal.aborted) {
          setProducts(data.products);
          setTotalPages(data.totalPages);
          setCurrentPage(data.currentPage);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError(true);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [currentPage]);

  const onPrev = () => {
    setCurrentPage(currentPage - 1);
  };
  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <main>
      <div className={`${styles.mainLayout} ${styles.sectionPadding}`}>
        {loading && <Loader />}
        {error && <ErrorMessage message="Error fetching products" />}
        {!loading && !error && (
          <>
            <ProductList products={products} className={styles.mainContent} />
            <PaginationControls
              onPrev={onPrev}
              onNext={onNext}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default ProductPage;
