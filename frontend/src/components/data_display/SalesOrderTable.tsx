import { makeStyles, withStyles } from "@material-ui/core/styles";
import BasicTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ISalesOrder, ISalesOrderItem } from "../../@types/ISalesOrder";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface SalesOrderTableProps {
  salesOrderData: ISalesOrder[];
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

/**
 * Table for sales order data
 * @returns
 */
export default function SalesOrderTable(props: SalesOrderTableProps) {
  const { salesOrderData } = props;
  const classes = useStyles();

  function getTotal(salesOrderItems: ISalesOrderItem[]): number {
    if (typeof salesOrderItems === "undefined") return 0;
    return salesOrderItems.reduce(
      (result, salesItem) =>
        salesItem.product.price * salesItem.quantity + result,
      0
    );
  }

  return (
    <TableContainer component={Paper}>
      <BasicTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id de la orden</StyledTableCell>
            <StyledTableCell>Cliente</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell>Pagado</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesOrderData.map((salesOrder) => (
            <StyledTableRow key={salesOrder.id}>
              <StyledTableCell component="th" scope="row">
                {salesOrder.id}
              </StyledTableCell>
              <StyledTableCell>
                {`${salesOrder.customer.firstName} ${salesOrder.customer.lastName}`}
              </StyledTableCell>
              <StyledTableCell>
                {getTotal(salesOrder.salesOrderItems)}
              </StyledTableCell>
              <StyledTableCell>
                {salesOrder.isPaid ? "Sí" : "No"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </BasicTable>
    </TableContainer>
  );
}
