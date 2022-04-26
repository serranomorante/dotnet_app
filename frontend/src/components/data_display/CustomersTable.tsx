import { makeStyles } from "@material-ui/core/styles";
import BasicTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ICustomer } from "../../@types/ICustomer";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface CustomersTableProps {
  customersData: ICustomer[];
}

/**
 * Table for inventory data
 * @returns
 */
export default function CustomersTable(props: CustomersTableProps) {
  const { customersData } = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <BasicTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Dirección 1</TableCell>
            <TableCell align="right">Dirección 2</TableCell>
            <TableCell align="right">Ciudad</TableCell>
            <TableCell align="right">País</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customersData.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell component="th" scope="row">
                {customer.firstName}
              </TableCell>
              <TableCell align="right">{customer.lastName}</TableCell>
              <TableCell align="right">
                {customer.primaryAddress.addressLine1}
              </TableCell>
              <TableCell align="right">
                {customer.primaryAddress.addressLine2}
              </TableCell>
              <TableCell align="right">
                {customer.primaryAddress.city}
              </TableCell>
              <TableCell align="right">
                {customer.primaryAddress.country}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </BasicTable>
    </TableContainer>
  );
}
