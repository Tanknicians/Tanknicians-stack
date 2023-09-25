import {
  UserOption,
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
import { useState } from 'react';
import CreateUserModal from '../../components/forms/CreateUser';
import { UserQuearyArgs } from '../../redux/slices/users/userManagementSlice';

export default function Clients() {
  const userQuearyArgs: UserQuearyArgs = {
    includeTanks: true,
    isEmployee: false
  };
  const { data: optionsList, error } = useGetClientsQuery(userQuearyArgs);
  const [tankModalOpen, setTankModalOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<UserOption | null>(null);

  const handleUserSelected = (
    _event: React.SyntheticEvent,
    client: UserOption | null
  ) => {
    setSelectedClient(client);
  };

  const handleOpenUserModal = () => {
    setClientModalOpen((prevState) => !prevState);
  };

  const handleOpenTankModal = () => {
    setTankModalOpen((prevState) => !prevState);
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
            Clients
          </Typography>
        </Grid>
        <Grid xs={1} sm={1} item />
        <Grid item xs={6} sm={6}>
          <UserSearchBar
            optionsList={optionsList}
            handleUserSelected={handleUserSelected}
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
              Add Client
            </Button>
          </Box>
        </Grid>
        <Grid xs={1} sm={1} item />
        <Grid xs={12} sm={12} item>
          <Collapse in={!!selectedClient}>
            <UserCard user={selectedClient} />
            <Button variant='contained' onClick={handleOpenTankModal}>
              <AddIcon />
              Add Tank
            </Button>
            {selectedClient && (
              <CreateTankForm
                userId={selectedClient.id}
                open={tankModalOpen}
                setOpen={handleOpenTankModal}
              />
            )}
          </Collapse>
        </Grid>
        <Grid xs={1} sm={1} item />
      </Grid>
      <CreateUserModal
        open={clientModalOpen}
        setOpen={setClientModalOpen}
        isEmployee={false}
      />
    </>
  );
}
