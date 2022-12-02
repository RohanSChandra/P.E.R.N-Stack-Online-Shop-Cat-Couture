import Table from "./Table";
import TableCell from "./TableCell";
import TableHeaderCell from "./TableHeaderCell";
import styles from "../../index.module.css";

const DiscountsReport = ({ reportData, className }) => {
  return (
    <div className={className}>
      <h3>Discounts Report</h3>
      <Table>
        <thead>
          <tr className={styles.leftAlign}>
            <TableHeaderCell>Discount Type</TableHeaderCell>
            <TableHeaderCell>Total Products</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {reportData.map((discount, index) => (
            <tr key={index}>
              <TableCell className={styles.leftAlign}>
                {discount.discountType || "No discount"}
              </TableCell>
              <TableCell className={styles.rightAlign}>
                {discount.totalProducts}
              </TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DiscountsReport;
