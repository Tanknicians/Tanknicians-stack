import { useGetUnapprovedServiceCallsQuery } from "../../redux/slices/forms/servicecallApiSlice";
import { useGetClientsQuery } from "../../redux/slices/users/userManagementSlice";
import CreateServiceCallModal from "../../components/forms/UpsertServiceCall";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import Container from "@mui/material/Container";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useMemo, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ServiceCall, tankSchema } from "../../zodTypes";
import TankName from "../../components/TankName";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const oneMinuteInMilliseconds = 60000;

export default function ApproveForms() {
  const navigate = useNavigate();
  //  Get Forms for table display
  const unapprovedForms = useGetUnapprovedServiceCallsQuery(undefined, {
    pollingInterval: oneMinuteInMilliseconds,
  }).data;

  const [serviceCallId, setServiceCallId] = useState<number | null>();
  const serviceCall = useMemo(
    () => unapprovedForms?.find((form) => form.id === serviceCallId),
    [serviceCallId, unapprovedForms]
  );

  // Get Clients list with tanks included to find Technician and Client name associated with the service record
  const { data: optionsList, error } = useGetClientsQuery({
    includeTanks: true,
    isEmployee: undefined,
  });

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

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
        user.OwnedTanks?.forEach(function (tank: tankSchema) {
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

  function goToTankButton(tankId: number) {
    return (
      <Tooltip title="Navigate to Tank">
        <Button
          size="small"
          onClick={() => {
            navigate(`/dashboard/Tanks?tankId=${tankId}`);
          }}
        >
          <OpenInNewIcon />
        </Button>
      </Tooltip>
    );
  }

  function handleModalOpen(serviceCall: ServiceCall) {
    setServiceCallId(serviceCall.id);
  }

  return (
    <Container>
      <Grid
        container
        rowSpacing={4}
        alignItems="center"
        maxWidth={"800px"}
        margin={"auto"}
      >
        <Grid item xs={12}>
          <Typography variant="h4" component="h1">
            Approve Forms
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer elevation={3} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ textAlign: "center" }}>
                    Technician
                  </TableCell>
                  <TableCell align="center" sx={{ textAlign: "center" }}>
                    Client
                  </TableCell>
                  <TableCell align="center" sx={{ textAlign: "center" }}>
                    Tank Nickname
                  </TableCell>
                  <TableCell align="center" sx={{ textAlign: "center" }}>
                    Service Date
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {unapprovedForms?.map((object, index) => (
                  <TableRow
                    key={object.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      align="center"
                      sx={{ textAlign: "center" }}
                      component="th"
                      scope="row"
                    >
                      {getEmployeeName(object.employeeId)}
                    </TableCell>
                    <TableCell align="center" sx={{ textAlign: "center" }}>
                      {getClientName(object.tankId)}
                    </TableCell>
                    <TableCell align="center" sx={{ textAlign: "center" }}>
                      <TankName tankId={object.tankId} />
                    </TableCell>
                    <TableCell align="center" sx={{ textAlign: "center" }}>
                      {`${new Date(object.createdOn).getMonth() + 1}/${new Date(
                        object.createdOn
                      ).getDate()}/${new Date(object.createdOn).getFullYear()}`}
                    </TableCell>
                    <TableCell align="center" sx={{ textAlign: "center" }}>
                      {/* </TableCell>
                    <TableCell align="center" sx={{ textAlign: "center" }}> */}
                      <Tooltip title="Review Form">
                        <Button
                          onClick={() => handleModalOpen(object)}
                          size={"small"}
                        >
                          <CreateIcon />
                        </Button>
                      </Tooltip>
                      {goToTankButton(object.tankId)}
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
          open={!!serviceCall.id}
          setOpen={
            (open: boolean) =>
              !open &&
              setServiceCallId(
                null
              ) /*FIX: This is a hack to get the modal to close*/
          }
          tankId={serviceCall?.tankId}
          employeeId={serviceCall?.employeeId}
          previousServiceCall={serviceCall}
        />
      )}
    </Container>
  );
}
