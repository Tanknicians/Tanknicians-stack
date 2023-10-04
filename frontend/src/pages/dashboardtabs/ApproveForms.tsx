import { useGetUnapprovedServiceCallsQuery } from "../../redux/slices/forms/servicecallApiSlice";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useGetClientsQuery } from "../../redux/slices/users/userManagementSlice";
import { UserQuearyArgs } from "../../redux/slices/users/userManagementSlice";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import Container from "@mui/material/Container";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const headerGridStyle = {
  flex: 1,
  alignContent: "center",
};

const userQuearyArgs: UserQuearyArgs = {
  includeTanks: true,
  isEmployee: undefined,
};

const oneMinuteInMilliseconds = 60000;

export default function ApproveForms() {
  //  Get Forms for table display
  const unapprovedForms = useGetUnapprovedServiceCallsQuery(undefined, {
    pollingInterval: oneMinuteInMilliseconds,
  }).data;

  // Get Clients list with tanks included to find Technician and Client name associated with the service record
  const { data: optionsList, error } = useGetClientsQuery(userQuearyArgs);

  function getEmployeeName(empId: number) {
    // get the name of the technician associated with the passed employee id
    let ret = "EMPLOYEE NAME NOT FOUND";
    try {
      const matchedUserOption = optionsList?.find(
        (element) => element.id === empId,
      );
      if (matchedUserOption === undefined) {
      } else {
        ret = `${matchedUserOption.firstName} ${matchedUserOption.lastName}`;
      }
    } catch (e) {
      console.log(e);
    }
    return ret;
  }

  function getClientName(tankId: number) {
    let ret = "CLIENT NAME NOT FOUND";
    try {
      optionsList?.forEach(function (user) {
        user.OwnedTanks?.forEach(function (tank) {
          if (tank.id === tankId) {
            ret = `${user.firstName} ${user.lastName}`;
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
    return ret;
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
                    {getEmployeeName(employeeId)}
                  </TableCell>
                  <TableCell>{getClientName(tankId)}</TableCell>
                  <TableCell>{tankId}</TableCell>
                  <TableCell>
                    <Button onClick={() => console.log("Nice, you clicked it")}>
                      <BorderColorIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
