import {
  UserData,
  useGetClientsQuery,
} from '../../redux/slices/users/userManagementSlice';
import CreateTankForm from '../../components/forms/CreateTank';
import UserSearchBar from '../../components/UserSearchBar';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp
} from '@mui/x-data-grid';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { useMemo, useState } from 'react';

import { useGetServiceCallByTankIdQuery } from '../../redux/slices/forms/servicecallApiSlice';
import { Edit as EditIcon } from '@mui/icons-material';
import CreateServiceCallModal from '../../components/forms/UpsertServiceCall';
import Add from '@mui/icons-material/Add';
import { ServiceCall, UpdateTankMetaData } from '../../zodTypes';
import {
  LinearProgress,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Divider,
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  Typography} from '@mui/material';

function ServiceCallDataGrid({
  tank,
  employeeId
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
    onlyApprovedForms: false
  });

  const editButton = (params: GridRenderCellParams) => {
    return (
      <>
        <CreateServiceCallModal
          setOpen={(_) => setEditServiceCallId(undefined)}
          open={editServiceCallId === params.row.id}
          tankId={tank.id}
          employeeId={params.row.employeeId}
          previousServiceCall={params.row}
        />
        <IconButton
          onClick={() => setEditServiceCallId(params.row.id)}
          size='small'
        >
          <EditIcon fontSize='inherit' />
        </IconButton>
      </>
    );
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'employeeId', headerName: 'Technician ID', width: 130 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 130,
      sortable: false,
      renderCell: editButton
    }
  ];

  function rowCreate(
    id: number,
    date: string,
    employeeId: number
  ): {
    id: number;
    date: string;
    employeeId: number;
  } {
    return { id, date, employeeId };
  }

  if (isLoading) {
    return (
      <Box pt={1}>
        <LinearProgress color='primary' />
      </Box>
    );
  }

  if (!data) {
    return <div>'An error occurred.'</div>;
  }

  const rows: GridRowsProp = data?.map((serviceCall: ServiceCall) => {
    return rowCreate(
      serviceCall.id,
      new Date(serviceCall.createdOn).toLocaleDateString(),
      serviceCall.employeeId
    );
  });

  return (
    <div style={{ height: '700px', width: '100%' }}>
      <CreateServiceCallModal
        key={tank.id}
        open={createServiceCallOpen}
        setOpen={setCreateServiceCallOpen}
        tankId={tank.id}
        employeeId={employeeId}
      />
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
}

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
    onlyApprovedForms: false
  });

  if (isLoading) {
    return (
      <Box pt={1}>
        <LinearProgress color="primary" />
      </Box>
    );
  }

  if (!data) {
    return <div>'An error occured.'</div>;
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
              <TableCell>
                <Typography variant='h6' gutterBottom>
                  Service Calls
                </Typography>
              </TableCell>
              <TableCell />
              <TableCell />
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
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Technician Id</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((form) => (
              <TableRow key={form.id}>
                <TableCell>{form.id}</TableCell>
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
  >(tanks.at(0));

  const [createTankOpen, setCreateTankOpen] = useState(false);
  return (
    <>
      <CreateTankForm
        userId={employeeId}
        open={createTankOpen}
        setOpen={setCreateTankOpen}
      />
      <Stack direction='row' justifyContent='left'>
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
        <ServiceCallDataGrid tank={selectedTank} employeeId={employeeId} />
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
    customer: UserData | null
  ) => {
    selectCurrentUserId(customer?.id ?? null);
  };

  if (!optionsList) return <div>Loading...</div>;

  return (
    <>
      <Container sx={{ p: 2 }}>
        <Grid container sx={{ paddingBottom: '10px' }}>
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
