import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserSearchBar, { UserOption} from '../UserSearchBar';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';

const headerGridStyle = {
  flex: 1,
  alignContent: 'center'
}

const client:UserOption[] = [{
  id: 1234,
  firstName: 'John',
  middleName: 'C',
  lastName: 'ClientMan',
  address: '1234 Woodpecher Drive, Springfliend, Illinois, 32567',
  phone: '555-555-1234',
}]

const searchBarInput = () => {
  console.log('clicked')
}

function ClientDetails(Client:UserOption){

}

export default function Clients() {
  return (
    <div style = {{marginLeft: 'auto', marginRight: 'auto',maxWidth: '1000px'}}>
      {/* This box has a grid with the page title in one cell, a section to put a search bar in the middle cell, and a container for a button in the far right cell */}
      <Box sx={{ flexGrow: 1, display: 'flex', padding: '20px', }}>
        <Grid container spacing={2} >
          <Grid item xs={12} sm={2} sx={{...headerGridStyle, backgroundColor: 'inherit'}}>
            <Typography color='inherit' variant='h4' component='h1' sx={{float: 'left', minWidth:'fit-content'}}>
              Clients
            </Typography>
          </Grid>
          <Grid item xs={6} sm={8} sx={{...headerGridStyle, backgroundColor: 'inherit'}}>
          <Container maxWidth="sm">
              <UserSearchBar optionsList={client} handleUserSelected = {searchBarInput}/>
          </Container>
          </Grid>
          <Grid item xs={6} sm={2} sx={{...headerGridStyle, backgroundColor: 'inherit'}}>
            <Button variant="contained" sx={{float: 'right'}}><AddIcon/>Add Client</Button>
          </Grid>
        </Grid>
      </Box>
      {/* {selected & <ClientDetails/>} */}
    </div>
  );
}
