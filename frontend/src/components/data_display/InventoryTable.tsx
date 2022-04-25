import { makeStyles } from "@material-ui/core/styles";
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
            <TableCell>Item</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Cantidad ideal</TableCell>
            <TableCell align="right">Precio Unitario</TableCell>
            <TableCell align="right">Impuestos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventoryData.map((inventory) => (
            <TableRow key={inventory.id}>
              <TableCell component="th" scope="row">
                {inventory.product.name}
              </TableCell>
              <TableCell align="right">{inventory.quantityOnHand}</TableCell>
              <TableCell align="right">{inventory.idealQuantity}</TableCell>
              <TableCell align="right">{inventory.product.price}</TableCell>
              <TableCell align="right">{inventory.product.isTaxable}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </BasicTable>
    </TableContainer>
  );
}
