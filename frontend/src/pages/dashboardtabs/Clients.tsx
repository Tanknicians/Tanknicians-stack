import {
  UserOption,
  useGetClientsQuery
} from '../../redux/slices/users/userManagementSlice';
import CreateTankForm from '../../components/CreateTankForm';
import UserSearchBar from '../../components/UserSearchBar';
import CreateUserModal from '../../components/CreateUser';
import Typography from '@mui/material/Typography';
import UserCard from '../../components/UserCard';
import Container from '@mui/material/Container';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';

const headerGridStyle = {
  flex: 1,
  alignContent: 'center'
};

export default function Clients() {
  const { data: optionsList, error } = useGetClientsQuery(true);
  const [tankModalOpen, setTankModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<UserOption | null>(
    null
  );

  const handleUserSelected = (
    _event: React.SyntheticEvent,
    customer: UserOption | null
  ) => {
    setCollapse(true);
    setSelectedCustomer(customer);
    console.log('customer: ', customer);
  };

  const handleOpenUserModal = () => {
    setUserModalOpen((prevState) => !prevState);
  };

  const handleOpenTankModal = () => {
    setTankModalOpen((prevState) => !prevState);
  };

  if (!optionsList) return <div>Loading...</div>;

  return (
    <div
      style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1000px' }}
    >
      {/* This box has a grid with the page title in one cell, a section to put a search bar in the middle cell, and a container for a button in the far right cell */}
      <Box sx={{ flexGrow: 1, display: 'flex', padding: '20px' }}>
        <Grid container spacing={1}>
          <Grid
            item
            xs={6}
            sm={3}
            sx={{ ...headerGridStyle, backgroundColor: 'inherit' }}
          >
            <Typography
              color='inherit'
              variant='h4'
              component='h1'
              sx={{ float: 'left', minWidth: 'fit-content' }}
            >
              Clients
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={7}
            sx={{ ...headerGridStyle, backgroundColor: 'inherit' }}
          >
            <Container maxWidth='sm'>
              <UserSearchBar
                optionsList={optionsList}
                handleUserSelected={handleUserSelected}
              />
            </Container>
          </Grid>
          <Grid
            item
            xs={6}
            sm={2}
            sx={{ ...headerGridStyle, backgroundColor: 'inherit' }}
          >
            <Button variant='contained' onClick={handleOpenUserModal}>
              <AddIcon />
              Add Client
            </Button>
            <CreateUserModal
              open={userModalOpen}
              setOpen={setUserModalOpen}
              isEmployee={false}
            />
          </Grid>
        </Grid>
      </Box>
      <Collapse in={collapse}>
        <UserCard user={selectedCustomer} />
        <Button
          variant='contained'
          sx={{ float: 'right' }}
          onClick={handleOpenTankModal}
        >
          <AddIcon />
          Add Tank
        </Button>
        {selectedCustomer && (
          <CreateTankForm
            userId={selectedCustomer.id}
            open={tankModalOpen}
            setOpen={handleOpenTankModal}
          />
        )}
      </Collapse>
    </div>
  );
}
