import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const headerGridStyle = {
  flex: 1,
  alignContent: 'center'
};

export default function DataExport() {
  return (
    <div
      style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1000px' }}
    >
      {/* This box has a grid with the page title in one cell, a section to put a search bar in the middle cell, and a container for a button in the far right cell */}
      <Box sx={{ flexGrow: 1, display: 'flex', padding: '20px' }}>
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            sm={3}
            sx={{ ...headerGridStyle, backgroundColor: 'inherit' }}
          >
            <Typography
              color='inherit'
              variant='h4'
              component='h1'
              sx={{ float: 'left', minWidth: 'fit-content' }}
            >
              Data Export
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={7}
            sx={{ ...headerGridStyle, backgroundColor: 'inherit' }}
          >
            <Container maxWidth='sm' />
          </Grid>
          <Grid
            item
            xs={6}
            sm={2}
            sx={{ ...headerGridStyle, backgroundColor: 'inherit' }}
          />
        </Grid>
      </Box>
    </div>
  );
}
