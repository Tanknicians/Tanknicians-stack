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
    align: 'center',
    minWidth: 150
  },
  {
    field: 'employeeNotes',
    headerName: 'Employee Notes',
    headerAlign: 'center',
    align: 'center',
    minWidth: 150
  },
  {
    field: 'notApprovedNotes',
    headerName: 'Not Approved Notes',
    headerAlign: 'center',
    align: 'center',
    minWidth: 150
  },
  {
    field: 'notesUpdated',
    headerName: 'Notes Updated',
    headerAlign: 'center',
    align: 'center',
    minWidth: 200
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
    align: 'center',
    minWidth: 130
  },
  {
    field: 'ATOOperational',
    headerName: 'ATO Operational',
    headerAlign: 'center',
    align: 'center',
    minWidth: 130
  },
  {
    field: 'ATOReservoirFilled',
    headerName: 'ATO Reservoir Filled',
    headerAlign: 'center',
    align: 'center',
    minWidth: 150
  },
  {
    field: 'chemFilterAdjusted',
    headerName: 'Chem. Filter Adjusted',
    headerAlign: 'center',
    align: 'center',
    minWidth: 170
  },
  {
    field: 'doserAdjustementOrManualDosing',
    headerName: 'Dose-adjusted',
    headerAlign: 'center',
    align: 'center',
    minWidth: 130
  },
  {
    field: 'dosingReservoirsFull',
    headerName: 'Dosing Reservoirs Full',
    headerAlign: 'center',
    align: 'center',
    minWidth: 170
  },
  {
    field: 'floorsCheckedForSpillsOrDirt',
    headerName: 'Floors Checked',
    headerAlign: 'center',
    align: 'center',
    minWidth: 130
  },
  {
    field: 'glassCleanedInside',
    headerName: 'Glass Cleaned Inside',
    headerAlign: 'center',
    align: 'center',
    minWidth: 170
  },
  {
    field: 'glassCleanedOutside',
    headerName: 'Glass Cleaned Outside',
    headerAlign: 'center',
    align: 'center',
    minWidth: 170
  },
  {
    field: 'mechFilterChanged',
    headerName: 'Mech. Filter Changed',
    headerAlign: 'center',
    align: 'center',
    minWidth: 170
  },
  {
    field: 'pumpsClearedOfDebris',
    headerName: 'Pumps Cleared',
    headerAlign: 'center',
    align: 'center',
    minWidth: 130
  },
  {
    field: 'saltCreepCleaned',
    headerName: 'Salt Creep Cleaned',
    headerAlign: 'center',
    align: 'center',
    minWidth: 150
  },
  {
    field: 'skimmerCleanedAndOperational',
    headerName: 'Skimmer Cleaned',
    headerAlign: 'center',
    align: 'center',
    minWidth: 130
  },
  {
    field: 'waterChanged',
    headerName: 'Water Changed',
    headerAlign: 'center',
    align: 'center',
    minWidth: 130
  },
  {
    field: 'waterTestedRecordedDated',
    headerName: 'Water Test/Record Date',
    headerAlign: 'center',
    align: 'center',
    minWidth: 170
  },
  {
    field: 'pestAPresent',
    headerName: 'Pest A Present',
    headerAlign: 'center',
    align: 'center',
    minWidth: 130
  },
  {
    field: 'pestBPresent',
    headerName: 'Pest B Present',
    headerAlign: 'center',
    align: 'center',
    minWidth: 130
  },
  {
    field: 'pestCPresent',
    headerName: 'Pest C Present',
    headerAlign: 'center',
    align: 'center',
    minWidth: 130
  },
  {
    field: 'pestDPresent',
    headerName: 'Pest D Present',
    headerAlign: 'center',
    align: 'center',
    minWidth: 130
  },
  {
    field: 'employeeId',
    headerName: 'Employee ID',
    headerAlign: 'center',
    align: 'center',
    minWidth: 110
  },
  {
    field: 'tankId',
    headerName: 'Tank ID',
    headerAlign: 'center',
    align: 'center'
  }
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
      autoHeight
      rows={serviceForms ?? []}
      columns={serviceFormColumns}
      loading={isLoadingServiceForms}
      slots={{ toolbar: hideToolbar ? undefined : GridToolbar }}
    />
  );
}
