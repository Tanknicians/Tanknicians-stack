import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useGetUnapprovedServiceCallsQuery } from "../../redux/slices/forms/servicecallApiSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetClientsQuery } from "../../redux/slices/users/userManagementSlice";
import { UserQuearyArgs } from "../../redux/slices/users/userManagementSlice";

const headerGridStyle = {
  flex: 1,
  alignContent: "center",
};

const userQuearyArgs: UserQuearyArgs = {
  includeTanks: undefined,
  isEmployee: undefined,
};

const oneMinuteInMilliseconds = 60000;

export default function ApproveForms() {
  const unapprovedForms = useGetUnapprovedServiceCallsQuery(undefined, {
    pollingInterval: oneMinuteInMilliseconds,
  }).data;

  const { data: optionsList, error } = useGetClientsQuery(userQuearyArgs);
  console.log(optionsList);

  function getUserName(userId: number) {
    const ret = optionsList?.find((element) => element.id === userId);
    if (ret === undefined) {
      return "Name Not found";
    }
    return `${ret.firstName} ${ret.lastName}`;
  }

  return (
    <div
      style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "1000px" }}
    >
      {/* This box has a grid with the page title in one cell, a section to put a search bar in the middle cell, and a container for a button in the far right cell */}
      <Box sx={{ flexGrow: 1, display: "flex", padding: "20px" }}>
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ ...headerGridStyle, backgroundColor: "inherit" }}
          >
            <Typography
              color="inherit"
              variant="h4"
              component="h1"
              sx={{ float: "left", minWidth: "fit-content" }}
            >
              Approve Forms
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            sx={{ ...headerGridStyle, backgroundColor: "inherit" }}
          >
            <Container maxWidth="sm" />
          </Grid>
          <Grid
            item
            xs={6}
            sm={2}
            sx={{ ...headerGridStyle, backgroundColor: "inherit" }}
          />
        </Grid>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Technician</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Tank ID</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {unapprovedForms?.map(({ tankId, employeeId, id }, index) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {getUserName(employeeId)}
                  </TableCell>
                  <TableCell>{getUserName(tankId)}</TableCell>
                  <TableCell>{tankId}</TableCell>
                  <TableCell>BUTTON</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
