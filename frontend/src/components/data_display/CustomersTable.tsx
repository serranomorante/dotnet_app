import { makeStyles, withStyles } from "@material-ui/core/styles";
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
            <StyledTableCell>First name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Dirección 1</StyledTableCell>
            <StyledTableCell align="right">Dirección 2</StyledTableCell>
            <StyledTableCell align="right">Ciudad</StyledTableCell>
            <StyledTableCell align="right">País</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customersData.map((customer) => (
            <StyledTableRow key={customer.id}>
              <StyledTableCell component="th" scope="row">
                {customer.firstName}
              </StyledTableCell>
              <StyledTableCell align="right">
                {customer.lastName}
              </StyledTableCell>
              <StyledTableCell align="right">
                {customer.primaryAddress.addressLine1}
              </StyledTableCell>
              <StyledTableCell align="right">
                {customer.primaryAddress.addressLine2}
              </StyledTableCell>
              <StyledTableCell align="right">
                {customer.primaryAddress.city}
              </StyledTableCell>
              <StyledTableCell align="right">
                {customer.primaryAddress.country}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </BasicTable>
    </TableContainer>
  );
}
