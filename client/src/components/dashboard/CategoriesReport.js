import Table from "./Table";
import TableCell from "./TableCell";
import TableHeaderCell from "./TableHeaderCell";
import styles from "../../index.module.css";

const CategoriesReport = ({ reportData, className }) => {
  return (
    <div className={className}>
      <h3>Categories Report</h3>
      <Table>
        <thead>
          <tr className={styles.leftAlign}>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Discounted Products</TableHeaderCell>
            <TableHeaderCell>Total Products</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {reportData.map((category, index) => (
            <tr key={index}>
              <TableCell className={styles.leftAlign}>
                {category.categoryName || "No category"}
              </TableCell>
              <TableCell className={styles.rightAlign}>
                {category.discountedProducts}
              </TableCell>
              <TableCell className={styles.rightAlign}>
                {category.totalProducts}
              </TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoriesReport;
