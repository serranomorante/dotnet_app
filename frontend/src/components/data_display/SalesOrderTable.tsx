import { makeStyles } from "@material-ui/core/styles";
import BasicTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ISalesOrder } from "../../@types/ISalesOrder";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface SalesOrderTableProps {
  salesOrderData: ISalesOrder[];
}

/**
 * Table for sales order data
 * @returns
 */
export default function SalesOrderTable(props: SalesOrderTableProps) {
  const { salesOrderData } = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <BasicTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell align="right">Pagado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesOrderData.map((salesOrder) => (
            <TableRow key={salesOrder.id}>
              <TableCell component="th" scope="row">
                {`${salesOrder.customer.firstName} ${salesOrder.customer.lastName}`}
              </TableCell>
              <TableCell align="right">{salesOrder.isPaid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </BasicTable>
    </TableContainer>
  );
}
