import {
  UserData,
  useGetClientsQuery,
} from "../../redux/slices/users/userManagementSlice";
import { useGetAllServiceCallsQuery } from "../../redux/slices/forms/servicecallApiSlice";
import CreateUserModal from "../../components/forms/CreateUser";
import UserSearchBar from "../../components/UserSearchBar";
import Typography from "@mui/material/Typography";
import UserCard from "../../components/UserCard";
import Collapse from "@mui/material/Collapse";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { ServiceCall } from "../../zodTypes";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "approvedFlag", headerName: "", width: 90 },
  { field: "clientName", headerName: "Client Name", width: 130 },
  { field: "alkalinity", headerName: "Alkalinity", width: 90 },
  { field: "calcium", headerName: "Calcium", width: 90 },
  { field: "nitrate", headerName: "Nitrate", width: 90 },
  { field: "phosphate", headerName: "Phosphate", width: 90 },
  { field: "customerNotes", headerName: "Customer Notes", width: 90 },
  { field: "employeeNotes", headerName: "Employee Notes", width: 90 },
  { field: "unapprovedNotes", headerName: "Unapproved Notes", width: 90 },
  { field: "ATOOperational", headerName: "ATO Operational", width: 90 },
  {
    field: "ATOReservoirFilled",
    headerName: "ATO Reservoir Filled",
    width: 90,
  },
  {
    field: "chemFilterAdjusted",
    headerName: "Chem Filter Adjusted",
    width: 90,
  },
  {
    field: "doserAdjustementOrManualDosing",
    headerName: "Doser Adjustment Or Manual Dosing",
    width: 90,
  },
  {
    field: "dosingReservoirsFull",
    headerName: "Dosing Reservoirs Full",
    width: 90,
  },
  {
    field: "floorsCheckedForSpillsOrDirt",
    headerName: "Floors Checked For Spills Or Dirt",
    width: 90,
  },
  {
    field: "glassCleanedInside",
    headerName: "Glass Cleaned Inside",
    width: 90,
  },
  {
    field: "glassCleanedOutside",
    headerName: "Glass Cleaned Outside",
    width: 90,
  },
  {
    field: "mechFilterChanged",
    headerName: "Mech Filter Changed",
    width: 90,
  },
  {
    field: "pumpsClearedOfDebris",
    headerName: "Pumps Cleared Of Debris",
    width: 90,
  },
  { field: "saltCreepCleaned", headerName: "Salt Creep Cleaned", width: 90 },
  {
    field: "skimmerCleanedAndOperational",
    headerName: "Skimmer Cleaned And Operational",
    width: 90,
  },
  { field: "waterChanged", headerName: "Water Changed", width: 90 },
  {
    field: "waterTestedRecordedDate",
    headerName: "Water Tested Recorded Date",
    width: 90,
  },
  { field: "pestAPresent", headerName: "Pest A Present", width: 90 },
  { field: "pestBPresent", headerName: "Pest B Present", width: 90 },
  { field: "pestCPresent", headerName: "Pest C Present", width: 90 },
  { field: "pestDPresent", headerName: "Pest D Present", width: 90 },
  { field: "linkToTank", headerName: "Link To Tank", width: 90 },
];

export default function Employees() {
  const { data: optionsList, error: clientsError } = useGetClientsQuery({
    includeTanks: false,
    isEmployee: true,
  });
  const { data: serviceCallList, error: serviceCallsError } =
    useGetAllServiceCallsQuery();

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [serviceCallsByEmpId, setServiceCallsByEmpId] =
    useState<GridRowsProp | null>(null);

  const [selectedUserId, selectCurrentUserId] = useState<number | null>(null);
  const selectedUser = useMemo(
    () => optionsList?.find((user: any) => user.id === selectedUserId) ?? null,
    [optionsList, selectedUserId]
  );

  const handleUserSelected = (
    _event: React.SyntheticEvent,
    customer: UserData | null
  ) => {
    selectCurrentUserId(customer?.id ?? null);
    setServiceCallsByEmpId(
      serviceCallList?.filter(
        (obj: ServiceCall) => obj.employeeId === customer?.id
      ) as ServiceCall[]
    );
    console.log("Selected Employee's Service Calls", serviceCallsByEmpId);
  };

  const handleOpenUserModal = () => {
    setUserModalOpen((prevState) => !prevState);
  };

  if (!optionsList) return <div>Loading...</div>;
  return (
    <>
      {/* This box has a grid with the page title in one cell, a section to put a search bar in the middle cell, and a container for a button in the far right cell */}
      <Grid
        container
        spacing={1}
        sx={{ padding: "20px", margin: "auto", maxWidth: "1200px" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={2} sm={2}>
          <Typography
            color="inherit"
            variant="h4"
            component="h1"
            align="center"
          >
            Employees
          </Typography>
        </Grid>
        <Grid xs={1} sm={1} item />
        <Grid item xs={6} sm={6}>
          <UserSearchBar
            userList={optionsList}
            selectedUser={selectedUser}
            handleUserSelected={handleUserSelected}
          />
        </Grid>
        <Grid xs={1} sm={1} item />
        <Grid item xs={2} sm={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" onClick={handleOpenUserModal}>
              <AddIcon />
              Add Employee
            </Button>
          </Box>
        </Grid>
        <Grid xs={1} sm={1} item />
        <Grid xs={12} sm={12} item>
          <Collapse in={!!selectedUser}>
            <UserCard user={selectedUser} />
          </Collapse>
        </Grid>
        <Grid xs={1} sm={1} item />
      </Grid>
      <CreateUserModal
        open={userModalOpen}
        setOpen={setUserModalOpen}
        isEmployee={true}
      />

      <div style={{ height: 400, width: "100%" }}>
        {!!serviceCallsByEmpId && (
          <DataGrid
            rows={serviceCallsByEmpId}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        )}
      </div>
    </>
  );
}
