import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { ServiceCall } from '../../zodTypes';
import { useGetAllServiceCallsQuery } from '../../redux/slices/forms/servicecallApiSlice';

const serviceFormColumns: GridColDef<ServiceCall>[] = [
  { field: 'id', flex: 0 },
  { field: 'isApproved', flex: 1 },
  { field: 'createdOn', flex: 1 },
  { field: 'customerRequest', flex: 1 },
  { field: 'employeeNotes', flex: 1 },
  { field: 'notApprovedNotes', flex: 1 },
  { field: 'notesUpdated', flex: 1 },
  { field: 'alkalinity', flex: 1 },
  { field: 'calcium', flex: 1 },
  { field: 'nitrate', flex: 1 },
  { field: 'phosphate', flex: 1 },
  { field: 'ATOOperational', flex: 1 },
  { field: 'ATOReservoirFilled', flex: 1 },
  { field: 'chemFilterAdjusted', flex: 1 },
  { field: 'doserAdjustementOrManualDosing', flex: 1 },
  { field: 'dosingReservoirsFull', flex: 1 },
  { field: 'floorsCheckedForSpillsOrDirt', flex: 1 },
  { field: 'glassCleanedInside', flex: 1 },
  { field: 'glassCleanedOutside', flex: 1 },
  { field: 'mechFilterChanged', flex: 1 },
  { field: 'pumpsClearedOfDebris', flex: 1 },
  { field: 'saltCreepCleaned', flex: 1 },
  { field: 'skimmerCleanedAndOperational', flex: 1 },
  { field: 'waterChanged', flex: 1 },
  { field: 'waterTestedRecordedDated', flex: 1 },
  { field: 'pestAPresent', flex: 1 },
  { field: 'pestBPresent', flex: 1 },
  { field: 'pestCPresent', flex: 1 },
  { field: 'pestDPresent', flex: 1 },
  { field: 'employeeId', flex: 1 },
  { field: 'tankId', flex: 1 }
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
