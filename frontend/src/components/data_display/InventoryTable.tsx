import { makeStyles, withStyles } from "@material-ui/core/styles";
import BasicTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IProductInventory } from "../../@types/IProduct";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface InventoryTableProps {
  inventoryData: IProductInventory[];
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
 * Table for inventory data
 * @returns
 */
export default function InventoryTable(props: InventoryTableProps) {
  const { inventoryData } = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <BasicTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item</StyledTableCell>
            <StyledTableCell align="right">Cantidad real</StyledTableCell>
            <StyledTableCell align="right">Cantidad ideal</StyledTableCell>
            <StyledTableCell align="right">Precio Unitario</StyledTableCell>
            <StyledTableCell align="right">Impuestos</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventoryData.map((inventory) => (
            <StyledTableRow key={inventory.id}>
              <StyledTableCell component="th" scope="row">
                {inventory.product.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {inventory.quantityOnHand}
              </StyledTableCell>
              <StyledTableCell align="right">
                {inventory.idealQuantity}
              </StyledTableCell>
              <StyledTableCell align="right">
                $ {inventory.product.price}
              </StyledTableCell>
              <StyledTableCell align="right">
                {inventory.product.isTaxable ? "Sí" : "No"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </BasicTable>
    </TableContainer>
  );
}
