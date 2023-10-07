import { useGetUnapprovedServiceCallsQuery } from "../../redux/slices/forms/servicecallApiSlice";
import { useGetClientsQuery } from "../../redux/slices/users/userManagementSlice";
import { UserQuearyArgs } from "../../redux/slices/users/userManagementSlice";
import CreateServiceCallModal from "../../components/forms/UpsertServiceCall";
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
import { useState } from "react";
import { ServiceCall } from "../../zodTypes";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slices/auth/authSlice";

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
  const loggedInUser = useSelector(selectCurrentUser);
  const [createServiceCallOpen, setCreateServiceCallOpen] = useState(false);
  const [serviceCall, setServiceCall] = useState<ServiceCall | null>();
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
        (element) => element.id === empId
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

  function handleModalOpen(serviceCall: ServiceCall) {
    setCreateServiceCallOpen(true);
    setServiceCall(serviceCall);
  }

  return (
    <div
      style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "1000px" }}
    >
      {!!serviceCall && (
        <CreateServiceCallModal
          key={serviceCall.id}
          open={createServiceCallOpen}
          setOpen={setCreateServiceCallOpen}
          tankId={serviceCall?.tankId}
          employeeId={serviceCall?.employeeId}
          previousServiceCall={serviceCall}
        />
      )}
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
          <Table
            sx={{
              // "& .MuiTableRow-root:hover": {
              //   backgroundColor: "primary.light",
              // },

              minWidth: "650px",
            }}
            aria-label="simple table"
          >
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
              {unapprovedForms?.map((object, index) => (
                <TableRow
                  key={object.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {getEmployeeName(object.employeeId)}
                  </TableCell>
                  <TableCell>{getClientName(object.tankId)}</TableCell>
                  <TableCell>{object.tankId}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleModalOpen(object)}>
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
