import { makeStyles, withStyles } from "@material-ui/core/styles";
import BasicTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ISalesOrderItem } from "../../@types/ISalesOrder";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

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

interface InvoiceTableProps {
  invoiceData: ISalesOrderItem[];
}

/**
 * Table for invoice data
 * @returns
 */
export default function InvoiceTable(props: InvoiceTableProps) {
  const { invoiceData } = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <BasicTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Producto</StyledTableCell>
            <StyledTableCell align="right">Cantidad</StyledTableCell>
            <StyledTableCell align="right">Valor Unit.</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceData.map((invoice) => (
            <StyledTableRow key={invoice.product.id}>
              <StyledTableCell component="th" scope="row">
                {invoice.product.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {invoice.quantity}
              </StyledTableCell>
              <StyledTableCell align="right">
                {invoice.product.price}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </BasicTable>
    </TableContainer>
  );
}
