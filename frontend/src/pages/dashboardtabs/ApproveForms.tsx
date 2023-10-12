import { useGetUnapprovedServiceCallsQuery } from "../../redux/slices/forms/servicecallApiSlice";
import {
  UserData,
  useGetClientsQuery,
} from "../../redux/slices/users/userManagementSlice";
import { UserQueryArgs } from "../../redux/slices/users/userManagementSlice";
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
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useState } from "react";
import { ServiceCall, UpdateTankMetaData } from "../../zodTypes";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slices/auth/authSlice";

const userQueryArgs: UserQueryArgs = {
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
  const { data: optionsList, error } = useGetClientsQuery(userQueryArgs);

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

  function handleModalOpen(serviceCall: ServiceCall) {
    setCreateServiceCallOpen(true);
    setServiceCall(serviceCall);
  }

  return (
    <Container>
      <Grid container spacing={1} maxWidth={"100%"}>
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Typography variant="h4" component="h1">
            Approve Forms
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <TableContainer component={Paper}>
            <Table>
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
        </Grid>
      </Grid>
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
    </Container>
  );
}
