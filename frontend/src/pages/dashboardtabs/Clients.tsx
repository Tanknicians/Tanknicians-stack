import {
  UserData,
  UserQueryArgs,
  useGetClientsQuery
} from '../../redux/slices/users/userManagementSlice';
import CreateTankForm from '../../components/forms/CreateTank';
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
import TanksCollapsibleTable from '../../components/TanksCollapsibleTable';
import UserGrid from '../../components/datagrid/UserGrid';
import { CircularProgress, Container, Paper } from '@mui/material';

export default function Clients() {
  const userQueryArgs: UserQueryArgs = {
    includeTanks: true,
    isEmployee: false
  };
  // Possible optimization:
  // query is ran every time the page is loaded, but it only needs to be ran once
  const { data: optionsList, error } = useGetClientsQuery(userQueryArgs);
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
    <>
      {/* This box has a grid with the page title in one cell, a section to put a search bar in the middle cell, and a container for a button in the far right cell */}

      <Grid container spacing={1} maxWidth={'100%'}>
        <Grid item xs={12} sm={12} md={3} xl={3}>
          <Typography variant='h4' component='h1'>
            Clients
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={6} xl={6}>
          <UserSearchBar
            userList={optionsList}
            selectedUser={selectedClient}
            handleUserSelected={handleUserSelected}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} xl={3}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: {
                xs: 'flex-start',
                sm: 'flex-start',
                md: 'flex-end'
              }
            }}
          >
            <Button variant='contained' onClick={handleOpenUserModal}>
              <AddIcon />
              Add Client
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} xl={12}>
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
            <Paper>
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
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant='h6' component='h1'>
                  {`${selectedClient.firstName} ${selectedClient.lastName}'s`}{' '}
                  Tanks
                </Typography>
                <Button variant='contained' onClick={handleOpenTankModal}>
                  <AddIcon />
                  Add Tank
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Container>
                <TanksCollapsibleTable
                  client={selectedClient}
                  tanks={selectedClient.OwnedTanks}
                />
              </Container>
            </Grid>
          </>
        )}
      </Grid>
      <CreateUserModal
        open={clientModalOpen}
        setOpen={setClientModalOpen}
        isEmployee={false}
      />
    </>
  );
}
