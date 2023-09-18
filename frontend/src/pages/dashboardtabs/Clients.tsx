import {
  UserOption,
  useGetClientsQuery
} from '../../redux/slices/users/userManagementSlice';
import CreateTankForm from '../../components/CreateTankForm';
import UserSearchBar from '../../components/UserSearchBar';
import Typography from '@mui/material/Typography';
import UserCard from '../../components/UserCard';
import Container from '@mui/material/Container';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';

const headerGridStyle = {
  flex: 1,
  alignContent: 'center'
}

export default function Clients() {
  const userId = 1;
  const { data: optionsList, error } = useGetClientsQuery(true);
  console.log('OptionsList: ', optionsList);
  console.log('OptionsList error: ', error);
  const [collapse, setCollapse] = useState(false);
  const [selectedUser, selectCurrentUser ] = useState<UserOption | null>(null)
  const [open, setOpen] = useState(false);

  const handleUserSelected = (
    _event: React.SyntheticEvent,
    customer: UserOption | null
  ) => {
    setCollapse(true)
    selectCurrentUser(customer);
    console.log('customer: ', customer);
  };

  if (!optionsList) return <div>Loading...</div>;


  return (
    <div style = {{marginLeft: 'auto', marginRight: 'auto',maxWidth: '1000px'}}>
      {/* This box has a grid with the page title in one cell, a section to put a search bar in the middle cell, and a container for a button in the far right cell */}
      <Box sx={{ flexGrow: 1, display: 'flex', padding: '20px', }}>
        <Grid container spacing={1} >
          <Grid item xs={6} sm={3} sx={{...headerGridStyle, backgroundColor: 'inherit'}}>
            <Typography color='inherit' variant='h4' component='h1' sx={{float: 'left', minWidth:'fit-content'}}>
              Clients
            </Typography>
          </Grid>
          <Grid item xs={6} sm={7} sx={{...headerGridStyle, backgroundColor: 'inherit'}}>
          <Container maxWidth="sm">
              <UserSearchBar optionsList={optionsList} handleUserSelected = {handleUserSelected}/>
          </Container>
          </Grid>
          <Grid item xs={6} sm={2} sx={{...headerGridStyle, backgroundColor: 'inherit'}}>
            <Button variant="contained" sx={{float: 'right'}} ><AddIcon/>Add Client</Button>
            
          </Grid>
        </Grid>
      </Box>
      <Collapse in={collapse}><UserCard user = {selectedUser}/>
        <Button variant="contained" sx={{float: 'right'}} onClick={() => setOpen(true)}><AddIcon/>Add Tank</Button>
        <CreateTankForm userId={userId} open={open} setOpen={setOpen} />
      </Collapse>
    </div>
  );
}
