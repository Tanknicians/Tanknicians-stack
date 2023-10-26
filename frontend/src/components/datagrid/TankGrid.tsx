import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { tankSchema } from '../../zodTypes';
import { useGetAllTanksQuery } from '../../redux/slices/tanks/tankDataSlice';

const tankColumns: GridColDef<tankSchema>[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 2,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'nickname',
    headerName: 'Nickname',
    flex: 4,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 4,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'volume',
    headerName: 'Volume',
    flex: 2,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'qrSymbol',
    headerName: 'QR Symbol',
    flex: 2,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'tanknicianSourcedOnly',
    headerName: 'Tanknician-sourced Only',
    flex: 4,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'lastDateServiced',
    flex: 4,
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
    flex: 3,
    headerAlign: 'center',
    align: 'center'
  }
];
export default function TankGrid({
  hideToolbar,
  selectTankId,
  selectUserId
}: {
  selectTankId?: (tankId: number) => void;
  selectUserId?: (userId: number) => void;
  hideToolbar?: boolean;
}) {
  const { data: tanks, isLoading: isLoadingTanks } =
    useGetAllTanksQuery(undefined);

  return (
    <DataGrid
      autoHeight
      rows={tanks ?? []}
      columns={tankColumns}
      loading={isLoadingTanks}
      getRowId={({ id }) => id}
      onRowClick={
        selectTankId && selectUserId
          ? ({ row }) => {
              selectUserId(row.customerId);
              selectTankId(row.id);
            }
          : undefined
      }
      slots={{ toolbar: hideToolbar ? undefined : GridToolbar }}
    />
  );
}
