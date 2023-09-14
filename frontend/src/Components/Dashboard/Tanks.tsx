import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const headerGridStyle = {
  
  alignContent: 'center'
}
export default function Tanks() {
  return (
    <div>
      {/* This box has a grid with the page title in one cell, a section to put a search bar in the middle cell, and a container for a button in the far right cell */}
      <Box sx={{ flexGrow: 1, display: 'flex', padding: '20px', }}>
        <Grid container spacing={2}>
          <Grid item xs={2} sx={headerGridStyle}>
            <Typography color='inherit' variant='h4' component='h1'>
              Tanks
            </Typography>
          </Grid>
          <Grid item xs={8}sx={headerGridStyle}>
            
          </Grid>
          <Grid item xs={2}sx={headerGridStyle}>
            
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}