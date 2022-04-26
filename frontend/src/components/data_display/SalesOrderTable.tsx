import { makeStyles, withStyles } from "@material-ui/core/styles";
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

  return (
    <TableContainer component={Paper}>
      <BasicTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Cliente</StyledTableCell>
            <StyledTableCell align="right">Pagado</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesOrderData.map((salesOrder) => (
            <StyledTableRow key={salesOrder.id}>
              <StyledTableCell component="th" scope="row">
                {`${salesOrder.customer.firstName} ${salesOrder.customer.lastName}`}
              </StyledTableCell>
              <StyledTableCell align="right">
                {salesOrder.isPaid}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </BasicTable>
    </TableContainer>
  );
}
