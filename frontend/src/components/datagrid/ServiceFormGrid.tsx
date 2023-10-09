import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { ServiceCall } from '../../zodTypes';
import { useGetAllServiceCallsQuery } from '../../redux/slices/forms/servicecallApiSlice';

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
