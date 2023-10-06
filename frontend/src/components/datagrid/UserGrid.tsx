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

export default function UserGrid({
  hideToolbar,
  selectUserId,
  isEmployee,
}: {
  hideToolbar?: boolean;
  selectUserId?: (userId: UserData["id"]) => void;
  isEmployee?: boolean;
}) {
  const { data: users, isLoading: isLoadingUsers } = useGetClientsQuery({
    includeTanks: false,
    isEmployee,
  });
  return (
    <DataGrid
      rows={users ?? []}
      columns={userColumns}
      getRowId={({ id }) => id}
      onRowClick={
        selectUserId ? ({ id }) => selectUserId(Number(id)) : undefined
      }
      loading={isLoadingUsers}
      slots={{ toolbar: hideToolbar ? undefined : GridToolbar }}
    />
  );
}
