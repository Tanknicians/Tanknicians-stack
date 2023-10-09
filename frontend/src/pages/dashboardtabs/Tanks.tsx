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
  Paper,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  Menu,
  FormControl,
  Box,
  Card,
} from "@mui/material";
import SCDataGrid from "../../components/SCDataGrid";
import UserCard from "../../components/UserCard";
import TankGrid from "../../components/datagrid/TankGrid";

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

  const [description, setDescription] = useState<string>(
    selectedTank?.description ?? "",
  );

  const [createTankOpen, setCreateTankOpen] = useState(false);
  const [createServiceCallOpen, setCreateServiceCallOpen] = useState(false);
  const handleTankSelection = (event: SelectChangeEvent) => {
    const selectedTankId = event.target.value;
    const newTank = tanks.find(({ id }) => id === parseInt(selectedTankId));
    if (newTank) {
      setSelectedTank(newTank);
      setDescription(event.target.value);
    } else {
      console.error("Selected tank id that isn't in tank list");
    }
  };

  const handleAddTank = () => {
    setCreateTankOpen(true);
  };

  return (
    <>
      <CreateTankForm
        userId={employeeId}
        open={createTankOpen}
        setOpen={setCreateTankOpen}
      />
      {!selectedTank && (
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Card
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: 300,
              padding: 5,
              minHeight: 200,
              marginTop: 10,
            }}
          >
            <Typography variant="h6">This user has no tanks.</Typography>
            <Button
              sx={{ maxHeight: 40, marginBottom: 1 }}
              variant="outlined"
              onClick={handleAddTank}
            >
              Add Tank
            </Button>
          </Card>
        </Container>
      )}
      {selectedTank && (
        <>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
                <Select
                  autoWidth
                  variant="standard"
                  labelId="tank-id-selector-label"
                  id="tank-id-selector"
                  value={description}
                  onChange={handleTankSelection}
                  label="Tanks"
                  sx={{ borderBottom: "0", textAlign: "center" }}
                >
                  {tanks.map((tank) => {
                    return (
                      <MenuItem value={tank.id}>{tank.description}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Button
                sx={{ maxHeight: 40, marginBottom: 1 }}
                variant="outlined"
                onClick={handleAddTank}
              >
                Add Tank
              </Button>
            </Box>
            <Typography variant="h6">Service Calls</Typography>
          </Box>
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
              <Divider sx ={{marginTop: 1}}/>
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
      </Container>
    </>
  );
}
