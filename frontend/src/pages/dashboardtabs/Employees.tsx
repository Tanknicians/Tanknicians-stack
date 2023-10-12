import {
  UserData,
  useGetClientsQuery
} from '../../redux/slices/users/userManagementSlice';
import UserSearchBar from '../../components/UserSearchBar';
import Typography from '@mui/material/Typography';
import UserCard from '../../components/UserCard';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useMemo, useState } from 'react';
import CreateUserModal from '../../components/forms/CreateUser';
import UserGrid from '../../components/datagrid/UserGrid';
import { Paper } from '@mui/material';
import SCDataGrid from '../../components/SCDataGrid';

export default function Employees() {
  const { data: optionsList, error: clientsError } = useGetClientsQuery({
    includeTanks: false,
    isEmployee: true
  });

  const [userModalOpen, setUserModalOpen] = useState(false);

  const [selectedUserId, selectCurrentUserId] = useState<number | null>(null);
  const selectedUser = useMemo(
    () =>
      optionsList?.find((user: UserData) => user.id === selectedUserId) ?? null,
    [optionsList, selectedUserId]
  );

  const handleUserSelected = (
    _event: React.SyntheticEvent,
    customer: UserData | null
  ) => {
    selectCurrentUserId(customer?.id ?? null);
  };

  const handleOpenUserModal = () => {
    setUserModalOpen((prevState) => !prevState);
  };

  if (!optionsList) return <div>Loading...</div>;
  return (
    <>
      {/* This box has a grid with the page title in one cell, a section to put a search bar in the middle cell, and a container for a button in the far right cell */}
      <Grid
        container
        spacing={1}
        sx={{ padding: '20px', margin: 'auto', maxWidth: '1200px' }}
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs={2} sm={2}>
          <Typography
            color='inherit'
            variant='h4'
            component='h1'
            align='center'
          >
            Employees
          </Typography>
        </Grid>
        <Grid xs={1} sm={1} item />
        <Grid item xs={6} sm={6}>
          <UserSearchBar
            userList={optionsList}
            selectedUser={selectedUser}
            handleUserSelected={handleUserSelected}
            label='Employees'
          />
        </Grid>
        <Grid xs={1} sm={1} item />
        <Grid item xs={2} sm={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Button variant='contained' onClick={handleOpenUserModal}>
              <AddIcon />
              Add Employee
            </Button>
          </Box>
        </Grid>
        <Grid xs={1} sm={1} item />
        <Grid xs={12} sm={12} item>
          <Collapse in={!!selectedUser}>
            <UserCard user={selectedUser} />
          </Collapse>
          <Collapse in={!selectedUser} unmountOnExit>
            <Paper>
              <UserGrid
                hideToolbar
                isEmployee={true}
                selectUserId={selectCurrentUserId}
              />
            </Paper>
          </Collapse>
        </Grid>
        <CreateUserModal
          open={userModalOpen}
          setOpen={setUserModalOpen}
          isEmployee={true}
        />
        {selectedUserId && (
          <SCDataGrid employeeId={selectedUserId} tank={undefined} />
        )}
      </Grid>
    </>
  );
}
