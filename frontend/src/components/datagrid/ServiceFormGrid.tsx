import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { ServiceCall } from '../../zodTypes';
import { useGetAllServiceCallsQuery } from '../../redux/slices/forms/servicecallApiSlice';

const serviceFormColumns: GridColDef<ServiceCall>[] = [
  { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center' },
  {
    field: 'isApproved',
    headerName: 'Is Approved',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'createdOn',
    headerName: 'Created On',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'customerRequest',
    headerName: 'Customer Request',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'employeeNotes',
    headerName: 'Employee Notes',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'notApprovedNotes',
    headerName: 'Not Approved Notes',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'notesUpdated',
    headerName: 'Notes Updated',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'alkalinity',
    headerName: 'Alkalinity',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'calcium',
    headerName: 'Calcium',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'nitrate',
    headerName: 'Nitrate',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'phosphate',
    headerName: 'Phosphate',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'ATOOperational',
    headerName: 'ATO Operational',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'ATOReservoirFilled',
    headerName: 'ATO Reservoir Filled',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'chemFilterAdjusted',
    headerName: 'Chem. Filter Adjusted',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'doserAdjustementOrManualDosing',
    headerName: 'Doser Adjustment or Manual Dosing',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'dosingReservoirsFull',
    headerName: 'Dosing Reservoirs Full',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'floorsCheckedForSpillsOrDirt',
    headerName: 'Floors Checked for Spills or Dirt',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'glassCleanedInside',
    headerName: 'Glass Cleaned Inside',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'glassCleanedOutside',
    headerName: 'Glass Cleaned Outside',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'mechFilterChanged',
    headerName: 'Mech. Filter Changed',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'pumpsClearedOfDebris',
    headerName: 'Pumps Cleared of Debris',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'saltCreepCleaned',
    headerName: 'Salt Creep Cleaned',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'skimmerCleanedAndOperational',
    headerName: 'Skimmer Cleaned and Operational',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'waterChanged',
    headerName: 'Water Changed',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'waterTestedRecordedDated',
    headerName: 'Water Test and Recorded Date',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'pestAPresent',
    headerName: 'Pest A Present',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'pestBPresent',
    headerName: 'Pest B Present',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'pestCPresent',
    headerName: 'Pest C Present',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'pestDPresent',
    headerName: 'Pest D Present',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'employeeId',
    headerName: 'Employee ID',
    headerAlign: 'center',
    align: 'center'
  },
  { field: 'tankId', headerName: 'Tank ID' }
];

export default function ServiceFormGrid({
  hideToolbar
}: {
  hideToolbar?: boolean;
}) {
  const { data: serviceForms, isLoading: isLoadingServiceForms } =
    useGetAllServiceCallsQuery({ isApproved: undefined });

  return (
    <DataGrid
      rows={serviceForms ?? []}
      columns={serviceFormColumns}
      loading={isLoadingServiceForms}
      slots={{ toolbar: hideToolbar ? undefined : GridToolbar }}
    />
  );
}
