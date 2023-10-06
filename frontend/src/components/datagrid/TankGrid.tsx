import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { UpdateTankMetaData } from "../../zodTypes";
import { useGetAllTanksQuery } from "../../redux/slices/tanks/tankDataSlice";

const tankColumns: GridColDef<UpdateTankMetaData>[] = [
  { field: "id", flex: 0 },
  { field: "type", flex: 1 },
  { field: "volume", flex: 1 },
  { field: "qrSymbol", flex: 1 },
  { field: "tanknicianSourcedOnly", flex: 1 },
  {
    field: "lastDateServiced",
    flex: 1,
    valueGetter({ row }) {
      return new Date(row.lastDateServiced).toDateString();
    },
  },
  { field: "customerId", flex: 1 },
  { field: "description", flex: 1 },
] as const;

export default function TankGrid() {
  const { data: tanks, isLoading: isLoadingTanks } =
    useGetAllTanksQuery(undefined);

  return (
    <DataGrid
      rows={tanks ?? []}
      columns={tankColumns}
      loading={isLoadingTanks}
      slots={{ toolbar: GridToolbar }}
    />
  );
}
