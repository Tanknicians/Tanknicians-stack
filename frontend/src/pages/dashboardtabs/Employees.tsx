import {
  UserData,
  useGetClientsQuery
} from '../../redux/slices/users/userManagementSlice';
import UserSearchBar from '../../components/UserSearchBar';
import Typography from '@mui/material/Typography';
import UserCard from '../../components/UserCard';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useMemo, useState } from 'react';
import CreateUserModal from '../../components/forms/CreateUser';
import UserGrid from '../../components/datagrid/UserGrid';
import { CircularProgress, Container, Paper } from '@mui/material';
import SCDataGrid from '../../components/SCDataGrid';
import { Add } from '@mui/icons-material';

export default function Employees() {
  const { data: optionsList, error: clientsError } = useGetClientsQuery({
    includeTanks: false,
    isEmployee: true
  });

  const [employeeModalOpen, setEmployeeModalOpen] = useState(false);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const selectedEmployee = useMemo(
    () =>
      optionsList?.find((user: UserData) => user.id === selectedEmployeeId) ??
      null,
    [optionsList, selectedEmployeeId]
  );

  const handleUserSelected = (
    _event: React.SyntheticEvent,
    employee: UserData | null
  ) => {
    setSelectedEmployeeId(employee?.id ?? null);
  };

  const handleOpenUserModal = () => {
    setEmployeeModalOpen((prevState) => !prevState);
  };

  if (!optionsList) return <CircularProgress />;
  return (
    <Container>
      <Grid container rowSpacing={1} alignItems='center' maxWidth={'100%'}>
        <Grid item xs={12} md={3}>
          <Typography variant='h4' component='h1'>
            Employees
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <UserSearchBar
            userList={optionsList}
            selectedUser={selectedEmployee}
            handleUserSelected={handleUserSelected}
            label='Employees'
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: {
                md: 'flex-end'
              }
            }}
          >
            <Button
              variant='contained'
              onClick={handleOpenUserModal}
              startIcon={<Add fontSize='inherit' />}
            >
              Add Employee
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Collapse in={!!selectedEmployee} unmountOnExit>
            <UserCard user={selectedEmployee} />
            {selectedEmployeeId && (
              <Paper elevation={3}>
                <SCDataGrid employeeId={selectedEmployeeId} tank={undefined} />
              </Paper>
            )}
          </Collapse>
          <Collapse in={!selectedEmployee} unmountOnExit>
            <Paper>
              <UserGrid
                hideToolbar
                isEmployee={true}
                selectUserId={setSelectedEmployeeId}
              />
            </Paper>
          </Collapse>
        </Grid>
      </Grid>
      <CreateUserModal
        open={employeeModalOpen}
        setOpen={setEmployeeModalOpen}
        isEmployee={true}
      />
    </Container>
  );
}
