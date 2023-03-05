import { format } from "date-fns";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { calculatePoints } from "shared/functions/calculatePoints";
import styles from "./AllTransactionOneCustomerTable.module.css";

export const AllTransactionOneCustomerTable = (props) => {
  const { purchases } = props;

  return (
    <TableContainer component={Paper} className={styles.root}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchases.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              role="table-body-tr"
            >
              <TableCell>
                {format(new Date(row.date), "yyyy-MM-dd HH:mm")}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{calculatePoints(row.price)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
