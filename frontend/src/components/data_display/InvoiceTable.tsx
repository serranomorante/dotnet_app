import { makeStyles } from "@material-ui/core/styles";
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
            <TableCell>Producto</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceData.map((invoice) => (
            <TableRow key={invoice.product.id}>
              <TableCell component="th" scope="row">
                {invoice.product.name}
              </TableCell>
              <TableCell align="right">{invoice.quantity}</TableCell>
              <TableCell align="right">{invoice.product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </BasicTable>
    </TableContainer>
  );
}
