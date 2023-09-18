import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserSearchBar from '../../components/UserSearchBar';
import { UserOption } from '../../redux/slices/users/userManagementSlice';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import UserCard from '../../components/UserCard';

const headerGridStyle = {
  flex: 1,
  alignContent: 'center'
}

const client:UserOption[] = [{
  id: 1234,
  firstName: 'John',
  middleName: 'C',
  lastName: 'EmployeeMan',
  address: '1234 Woodpecher Drive, Springfliend, Illinois, 32567',
  phone: '555-555-1234',
  isEmployee: true,
}]



export default function Employees() {
  const [collapse, setCollapse] = useState(false);
  const [selectedUser, selectCurrentUser ] = useState<UserOption | null>(null)

  const handleUserSelected = (
    _event: React.SyntheticEvent,
    customer: UserOption | null
  ) => {
    setCollapse(!collapse)
    selectCurrentUser(customer);
    console.log('customer: ', customer);
  };
  return (
    <div style = {{marginLeft: 'auto', marginRight: 'auto',maxWidth: '1000px'}}>
      {/* This box has a grid with the page title in one cell, a section to put a search bar in the middle cell, and a container for a button in the far right cell */}
      <Box sx={{ flexGrow: 1, display: 'flex', padding: '20px', }}>
        <Grid container spacing={1} >
          <Grid item xs={12} sm={3} sx={{...headerGridStyle, backgroundColor: 'inherit'}}>
            <Typography color='inherit' variant='h4' component='h1' sx={{float: 'left', minWidth:'fit-content'}}>
              Employees
            </Typography>
          </Grid>
          <Grid item xs={6} sm={7} sx={{...headerGridStyle, backgroundColor: 'inherit', alignContent: 'center',}}>
          <Container maxWidth="sm">
              <UserSearchBar optionsList={client} handleUserSelected = {handleUserSelected}/>
          </Container>
          </Grid>
          <Grid item xs={6} sm={2} sx={{...headerGridStyle, backgroundColor: 'inherit'}}>
            <Button variant="contained" sx={{float: 'right'}}><AddIcon/>Add Employee</Button>
          </Grid>
        </Grid>
      </Box>
      <Collapse in={collapse}><UserCard user = {selectedUser}/></Collapse>
    </div>
  );
}