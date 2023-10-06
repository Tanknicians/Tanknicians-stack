import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Paper, Stack } from '@mui/material';
import { useGetAllServiceCallsQuery } from '../../redux/slices/forms/servicecallApiSlice';
import { useGetAllTanksQuery } from '../../redux/slices/tanks/tankDataSlice';
import {
  UserData,
  useGetClientsQuery
} from '../../redux/slices/users/userManagementSlice';
import { ServiceCall, UpdateTankMetaData } from '../../zodTypes';

const userColumns: GridColDef<UserData>[] = [
  { field: 'id', flex: 0 },
  { field: 'isEmployee', flex: 1 },
  { field: 'firstName', flex: 1 },
  { field: 'middleName', flex: 1 },
  { field: 'lastName', flex: 1 },
  { field: 'address', flex: 2 },
  { field: 'phone', flex: 1 }
] as const;

const tankColumns: GridColDef<UpdateTankMetaData>[] = [
  { field: 'id', flex: 0 },
  { field: 'type', flex: 1 },
  { field: 'volume', flex: 1 },
  { field: 'qrSymbol', flex: 1 },
  { field: 'tanknicianSourcedOnly', flex: 1 },
  {
    field: 'lastDateServiced',
    flex: 1,
    valueGetter({ row }) {
      return new Date(row.lastDateServiced).toDateString();
    }
  },
  { field: 'customerId', flex: 1 },
  { field: 'description', flex: 1 }
] as const;

const serviceFormColumns: GridColDef<ServiceCall>[] = [
  { field: 'id' },
  { field: 'isApproved' },
  { field: 'createdOn' },
  { field: 'customerRequest' },
  { field: 'employeeNotes' },
  { field: 'notApprovedNotes' },
  { field: 'notesUpdated' },
  { field: 'alkalinity' },
  { field: 'calcium' },
  { field: 'nitrate' },
  { field: 'phosphate' },
  { field: 'ATOOperational' },
  { field: 'ATOReservoirFilled' },
  { field: 'chemFilterAdjusted' },
  { field: 'doserAdjustementOrManualDosing' },
  { field: 'dosingReservoirsFull' },
  { field: 'floorsCheckedForSpillsOrDirt' },
  { field: 'glassCleanedInside' },
  { field: 'glassCleanedOutside' },
  { field: 'mechFilterChanged' },
  { field: 'pumpsClearedOfDebris' },
  { field: 'saltCreepCleaned' },
  { field: 'skimmerCleanedAndOperational' },
  { field: 'waterChanged' },
  { field: 'waterTestedRecordedDated' },
  { field: 'pestAPresent' },
  { field: 'pestBPresent' },
  { field: 'pestCPresent' },
  { field: 'pestDPresent' },
  { field: 'employeeId' },
  { field: 'tankId' }
] as const;

export default function DataExport() {
  const { data: users, isLoading: isLoadingUsers } = useGetClientsQuery({
    includeTanks: false,
    isEmployee: undefined
  });
  const { data: tanks, isLoading: isLoadingTanks } =
    useGetAllTanksQuery(undefined);
  const { data: serviceForms, isLoading: isLoadingServiceForms } =
    useGetAllServiceCallsQuery(undefined);

  return (
    <Container>
      <Stack height={1000} spacing={2} component={Paper} padding={2}>
        <Typography variant='h4'>Data Export</Typography>
        <DataGrid
          rows={users ?? []}
          columns={userColumns}
          loading={isLoadingUsers}
          slots={{ toolbar: GridToolbar }}
        />
        <DataGrid
          rows={tanks ?? []}
          columns={tankColumns}
          loading={isLoadingTanks}
          slots={{ toolbar: GridToolbar }}
        />
        <DataGrid
          rows={serviceForms ?? []}
          columns={serviceFormColumns}
          loading={isLoadingServiceForms}
          slots={{ toolbar: GridToolbar }}
        />
      </Stack>
    </Container>
  );
}
