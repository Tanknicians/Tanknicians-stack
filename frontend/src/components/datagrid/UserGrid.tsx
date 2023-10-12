import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import {
  UserData,
  useGetClientsQuery,
} from "../../redux/slices/users/userManagementSlice";

const userColumns: GridColDef<UserData>[] = [
  { field: "id", headerName: "", flex: 0 },
  { field: "firstName", headerName: "First Name", flex: 1 },

  { field: "lastName", headerName: "Last Name", flex: 1 },
  { field: "address", headerName: "Address", flex: 2 },
  { field: "phone", headerName: "Phone", flex: 1 },
];

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
      rowBuffer={1}
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
