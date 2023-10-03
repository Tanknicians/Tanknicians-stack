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

const headerGridStyle = {
  flex: 1,
  alignContent: "center",
};

const oneMinuteInMilliseconds = 60000;

export default function ApproveForms() {
  const unapprovedForms = useGetUnapprovedServiceCallsQuery(undefined, {
    pollingInterval: oneMinuteInMilliseconds,
  }).data;

  function getEmployeeName(empId: number) {
    return 1;
  }

  function getClientName(clientId: number) {
    return 2;
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
                <TableCell>Technician</TableCell>
                <TableCell align="right">Client</TableCell>
                <TableCell align="right">Tank ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unapprovedForms?.map(({ tankId, employeeId, id }, key) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {getEmployeeName(employeeId)}
                  </TableCell>
                  <TableCell align="right">{getClientName(tankId)}</TableCell>
                  <TableCell align="right">{tankId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
