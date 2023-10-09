import {
  UserData,
  useGetClientsQuery,
} from "../../redux/slices/users/userManagementSlice";
import CreateTankForm from "../../components/forms/CreateTank";
import UserSearchBar from "../../components/UserSearchBar";
import type {} from "@mui/x-data-grid/themeAugmentation";
import { useMemo, useState } from "react";

import CreateServiceCallModal from "../../components/forms/UpsertServiceCall";
import Add from "@mui/icons-material/Add";
import { UpdateTankMetaData } from "../../zodTypes";
import {
  Stack,
  Tab,
  Tabs,
  Divider,
  Button,
  Collapse,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SCDataGrid from "../../components/SCDataGrid";

export function TankTabs({
  tanks,
  employeeId,
}: {
  tanks: UpdateTankMetaData[];
  employeeId: number;
}) {
  const [selectedTank, setSelectedTank] = useState<
    UpdateTankMetaData | undefined
  >(tanks.at(0));

  const [createTankOpen, setCreateTankOpen] = useState(false);
  const [createServiceCallOpen, setCreateServiceCallOpen] = useState(false);

  return (
    <>
      <CreateTankForm
        userId={employeeId}
        open={createTankOpen}
        setOpen={setCreateTankOpen}
      />
      <Stack direction="row" justifyContent="left">
        <Tabs
          value={selectedTank ? selectedTank.id : false}
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
        <>
          <CreateServiceCallModal
            key={selectedTank.id}
            open={createServiceCallOpen}
            setOpen={setCreateServiceCallOpen}
            tankId={selectedTank.id}
            employeeId={employeeId}
          />
          <SCDataGrid tank={selectedTank} employeeId={undefined} />
        </>
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
    [optionsList, selectedUserId],
  );

  const collapse = !!selectedUser;

  const handleUserSelected = (
    _event: React.SyntheticEvent,
    customer: UserData | null,
  ) => {
    selectCurrentUserId(customer?.id ?? null);
  };

  if (!optionsList) return <div>Loading...</div>;

  return (
    <>
      <Container sx={{ p: 2 }}>
        <Grid container sx={{ paddingBottom: "10px" }}>
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
          <Grid item xs={12}>
            <Collapse in={collapse}>
              <UserCard user={selectedUser} />
              <Divider />
              <Typography variant='h4' gutterBottom>
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
            <Collapse in={!collapse}>
              <Paper>
                <TankGrid hideToolbar selectTankId={selectCurrentUserId} />
              </Paper>
            </Collapse>
          </Grid>
        </Grid>
        <Divider />
        <Collapse in={collapse}>
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
