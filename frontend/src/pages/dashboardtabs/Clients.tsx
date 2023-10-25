import {
  UserData,
  useGetClientsQuery
} from '../../redux/slices/users/userManagementSlice';
import CreateTankForm from '../../components/forms/Upsert';
import UserSearchBar from '../../components/UserSearchBar';
import Typography from '@mui/material/Typography';
import UserCard from '../../components/UserCard';
import Collapse from '@mui/material/Collapse';
import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useMemo, useState } from 'react';
import CreateUserModal from '../../components/forms/CreateUser';
import TanksCollapsibleTable from '../../components/TanksCollapsibleTable';
import UserGrid from '../../components/datagrid/UserGrid';
import { CircularProgress, Container, Paper } from '@mui/material';

export default function Clients() {
  const { data: optionsList, error } = useGetClientsQuery({
    includeTanks: true,
    isEmployee: false
  });
  const [tankModalOpen, setTankModalOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const selectedClient = useMemo(
    () => optionsList?.find((client) => client.id === selectedClientId) ?? null,
    [optionsList, selectedClientId]
  );

  const handleUserSelected = (
    _event: React.SyntheticEvent,
    client: UserData | null
  ) => {
    setSelectedClientId(client?.id ?? null);
  };

  const handleOpenUserModal = () => {
    setClientModalOpen((prevState) => !prevState);
  };

  const handleOpenTankModal = () => {
    setTankModalOpen((prevState) => !prevState);
  };

  if (!optionsList) return <CircularProgress />;

  return (
    <Container>
      <Grid container rowSpacing={2} maxWidth={'100%'} alignItems='center'>
        <Grid item xs={12} md={3}>
          <Typography variant='h4' component='h1'>
            Clients
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <UserSearchBar
            userList={optionsList}
            selectedUser={selectedClient}
            handleUserSelected={handleUserSelected}
            label='Clients'
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
              Add Client
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Collapse in={!!selectedClient} unmountOnExit>
            <UserCard user={selectedClient} />
            {selectedClient && (
              <CreateTankForm
                userId={selectedClient.id}
                open={tankModalOpen}
                setOpen={handleOpenTankModal}
              />
            )}
          </Collapse>
          <Collapse in={!selectedClient} unmountOnExit>
            <Paper elevation={3}>
              <UserGrid
                hideToolbar
                isEmployee={false}
                selectUserId={setSelectedClientId}
              />
            </Paper>
          </Collapse>
        </Grid>
        {selectedClient?.OwnedTanks && (
          <>
            <Grid item xs={12} md={12}>
              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant='h6' component='h1'>
                  {`${selectedClient.firstName} ${selectedClient.lastName}'s`}{' '}
                  Tanks
                </Typography>
                <Button
                  variant='contained'
                  onClick={handleOpenTankModal}
                  startIcon={<Add fontSize='inherit' />}
                >
                  Add Tank
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={12}>
              <TanksCollapsibleTable
                client={selectedClient}
                tanks={selectedClient.OwnedTanks}
              />
            </Grid>
          </>
        )}
      </Grid>
      <CreateUserModal
        open={clientModalOpen}
        setOpen={setClientModalOpen}
        isEmployee={false}
      />
    </Container>
  );
}
