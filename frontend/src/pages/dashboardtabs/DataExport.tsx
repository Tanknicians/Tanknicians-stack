import Typography from '@mui/material/Typography';
import { Grid, Container, Paper, Stack, Tab, Tabs, Box } from '@mui/material';
import UserGrid from '../../components/datagrid/UserGrid';
import TankGrid from '../../components/datagrid/TankGrid';
import ServiceFormGrid from '../../components/datagrid/ServiceFormGrid';
import { useState } from 'react';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function DataExport() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Grid
        container
        rowSpacing={1}
        alignItems='center'
        maxWidth={'900px'}
        margin={'auto'}
      >
        <Grid item xs={12}>
          <Typography variant='h4' component='h1'>
            Data Export
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 0, paddingTop: 0 }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label='Clients' />
            <Tab label='Employees' />
            <Tab label='Tanks' />
            <Tab label='Service Calls' />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <Stack height={'100vh'} spacing={2} component={Paper} padding={2}>
              <Typography variant='h6' component='h1'>
                All Clients
              </Typography>
              <UserGrid isEmployee={false} />
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Stack height={'100vh'} spacing={2} component={Paper} padding={2}>
              <Typography variant='h6' component='h1'>
                All Employees
              </Typography>
              <UserGrid isEmployee={true} />
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Stack height={'100vh'} spacing={2} component={Paper} padding={2}>
              <Typography variant='h6' component='h1'>
                All Tanks
              </Typography>
              <TankGrid />
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Stack height={'100vh'} spacing={2} component={Paper} padding={2}>
              <Typography variant='h6' component='h1'>
                All Service Calls
              </Typography>
              <ServiceFormGrid />
            </Stack>
          </CustomTabPanel>
        </Grid>
      </Grid>
    </Container>
  );
}
