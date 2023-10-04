import {
  UserWithTanks,
  useGetClientsQuery,
} from "../../redux/slices/users/userManagementSlice";
import CreateTankForm from "../../components/forms/CreateTank";
import UserSearchBar from "../../components/UserSearchBar";
import Typography from "@mui/material/Typography";
import UserCard from "../../components/UserCard";
import Container from "@mui/material/Container";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useMemo, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { useGetServiceCallByTankIdQuery } from "../../redux/slices/forms/servicecallApiSlice";
import { Edit as EditIcon } from "@mui/icons-material";
import CreateServiceCallModal from "../../components/forms/UpsertServiceCall";
import Add from "@mui/icons-material/Add";
import { UpdateTankMetaData } from "../../zodTypes";

function ServiceCallTable({
  tank,
  employeeId,
}: {
  tank: UpdateTankMetaData;
  employeeId: number;
}) {
  const [createServiceCallOpen, setCreateServiceCallOpen] = useState(false);
  const [editServiceCallId, setEditServiceCallId] = useState<
    number | undefined
  >();
  const { data, isLoading } = useGetServiceCallByTankIdQuery({
    tankId: tank.id,
    onlyApprovedForms: true,
  });

  if (isLoading) {
    return (
      <Box pt={1}>
        <LinearProgress color="primary" />
      </Box>
    );
  }

  if (!data) {
    return <div>"An error occured."</div>;
  }
  return (
    <>
      <CreateServiceCallModal
        key={tank.id}
        open={createServiceCallOpen}
        setOpen={setCreateServiceCallOpen}
        tankId={tank.id}
        employeeId={employeeId}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Technician Id</TableCell>
              <TableCell>
                <Button
                  size="small"
                  endIcon={<Add fontSize="inherit" />}
                  onClick={() => setCreateServiceCallOpen(true)}
                >
                  Add Service Form
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((form) => (
              <TableRow key={form.id}>
                <TableCell>
                  {new Date(form.createdOn).toLocaleDateString()}
                </TableCell>
                <TableCell>{form.employeeId}</TableCell>
                <TableCell>
                  <CreateServiceCallModal
                    setOpen={(_) => setEditServiceCallId(undefined)}
                    open={editServiceCallId === form.id}
                    tankId={tank.id}
                    employeeId={employeeId}
                    previousServiceCall={form}
                  />
                  <IconButton
                    onClick={() => setEditServiceCallId(form.id)}
                    size="small"
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export function TankTabs({
  tanks,
  employeeId,
}: {
  tanks: UpdateTankMetaData[];
  employeeId: number;
}) {
  const [selectedTank, setSelectedTank] = useState<
    UpdateTankMetaData | undefined
  >(tanks.at(-1));

  const [createTankOpen, setCreateTankOpen] = useState(false);
  return (
    <>
      <CreateTankForm
        userId={employeeId}
        open={createTankOpen}
        setOpen={setCreateTankOpen}
      />
      <Stack direction="row" justifyContent="space-between">
        <Tabs
          value={selectedTank?.id}
          onChange={(_, newTankId: number | "create") => {
            if (typeof newTankId === "number") {
              const newTank = tanks.find(({ id }) => id === newTankId);
              if (newTank) {
                setSelectedTank(newTank);
              } else {
                console.error("Selected tank id that isn't in tank list");
              }
            } else {
              setCreateTankOpen(true);
            }
          }}
        >
          {tanks.map((tank) => (
            <Tab
              label={`Tank: ${tank.qrSymbol}`}
              value={tank.id}
              key={tank.id}
            />
          ))}
          <Tab
            label={
              tanks.length ? (
                <Add />
              ) : (
                <Button variant="outlined">Add Tank</Button>
              )
            }
            value="create"
          />
        </Tabs>
      </Stack>
      {selectedTank && (
        <ServiceCallTable tank={selectedTank} employeeId={employeeId} />
      )}
    </>
  );
}

export default function Tanks() {
  const { data: optionsList } = useGetClientsQuery({
    includeTanks: true,
    isEmployee: false,
  });
  const [selectedUserId, selectCurrentUserId] = useState<number | null>(null);
  const selectedUser = useMemo(
    () => optionsList?.find((user) => user.id === selectedUserId) ?? null,
    [optionsList, selectedUserId]
  );

  const collapse = !!selectedUser;

  const handleUserSelected = (
    _event: React.SyntheticEvent,
    customer: UserWithTanks | null
  ) => {
    selectCurrentUserId(customer?.id ?? null);
  };

  if (!optionsList) return <div>Loading...</div>;

  return (
    <>
      <Container sx={{ p: 2 }}>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <Typography color="inherit" variant="h4" component="h1">
              Tanks
            </Typography>
          </Grid>
          <Grid item xs={6} sm={7}>
            <Container maxWidth="sm">
              <UserSearchBar
                userList={optionsList}
                selectedUser={selectedUser}
                handleUserSelected={handleUserSelected}
              />
            </Container>
          </Grid>
        </Grid>
        <Collapse in={collapse}>
          <UserCard user={selectedUser} />
          <Divider />
          <Typography variant="h4" gutterBottom>
            Service Calls
          </Typography>
          {selectedUser?.OwnedTanks && (
            <TankTabs
              key={selectedUser.id}
              tanks={selectedUser.OwnedTanks}
              employeeId={selectedUser.id}
            />
          )}
        </Collapse>
      </Container>
    </>
  );
}
