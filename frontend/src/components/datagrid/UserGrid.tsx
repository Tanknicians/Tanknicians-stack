import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import {
  UserData,
  useGetClientsQuery
} from '../../redux/slices/users/userManagementSlice';

const userColumns: GridColDef<UserData>[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'firstName',
    headerName: 'First',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'middleName',
    headerName: 'Middle',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'lastName',
    headerName: 'Last',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'address',
    headerName: 'Address',
    flex: 2,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'phone',
    headerName: 'Phone',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  }
];

export default function UserGrid({
  hideToolbar,
  selectUserId,
  isEmployee
}: {
  hideToolbar?: boolean;
  selectUserId?: (userId: UserData['id']) => void;
  isEmployee?: boolean;
}) {
  const { data: users, isLoading: isLoadingUsers } = useGetClientsQuery({
    includeTanks: false,
    isEmployee
  });
  return (
    <DataGrid
      autoHeight
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
