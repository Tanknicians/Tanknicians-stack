import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import {
  UserData,
  useGetClientsQuery,
} from "../../redux/slices/users/userManagementSlice";

const userColumns: GridColDef<UserData>[] = [
  { field: "id", flex: 0 },
  { field: "isEmployee", flex: 1 },
  { field: "firstName", flex: 1 },
  { field: "middleName", flex: 1 },
  { field: "lastName", flex: 1 },
  { field: "address", flex: 2 },
  { field: "phone", flex: 1 },
] as const;

export default function UserGrid() {
  const { data: users, isLoading: isLoadingUsers } = useGetClientsQuery({
    includeTanks: false,
    isEmployee: undefined,
  });

  return (
    <DataGrid
      rows={users ?? []}
      columns={userColumns}
      loading={isLoadingUsers}
      slots={{ toolbar: GridToolbar }}
    />
  );
}
