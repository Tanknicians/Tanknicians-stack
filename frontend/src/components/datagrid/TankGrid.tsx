import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { UpdateTankMetaData } from '../../zodTypes';
import { useGetAllTanksQuery } from '../../redux/slices/tanks/tankDataSlice';

const tankColumns: GridColDef<UpdateTankMetaData>[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'description',
    headerName: 'Nickname',
    flex: 2,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 2,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'volume',
    headerName: 'Volume',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'qrSymbol',
    headerName: 'QR Symbol',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'tanknicianSourcedOnly',
    headerName: 'Tanknician-sourced Only',
    flex: 2,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'lastDateServiced',
    flex: 2,
    headerAlign: 'center',
    align: 'center',
    headerName: 'Last Date Serviced',
    valueGetter({ row }) {
      return new Date(row.lastDateServiced).toDateString();
    }
  },
  {
    field: 'customerId',
    headerName: 'Customer ID',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  }
];
export default function TankGrid({
  hideToolbar,
  selectTankId
}: {
  selectTankId?: (userId: UpdateTankMetaData['id']) => void;
  hideToolbar?: boolean;
}) {
  const { data: tanks, isLoading: isLoadingTanks } =
    useGetAllTanksQuery(undefined);

  return (
    <DataGrid
      rows={tanks ?? []}
      columns={tankColumns}
      loading={isLoadingTanks}
      getRowId={({ id }) => id}
      onRowClick={
        selectTankId ? ({ row }) => selectTankId(row.customerId) : undefined
      }
      slots={{ toolbar: hideToolbar ? undefined : GridToolbar }}
    />
  );
}
