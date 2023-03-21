import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ServiceForms from './DashboardContent/ManagerialTabs/ServiceForms';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const headerOptions = [
  {
    id:"Managerial",
    children: [
      {childId: "ServiceForms", component: ServiceForms, active: true},
      {childId: "Man tab 2", component: <h1>man tab 2</h1>, active:false},
      {childId: "Man tab 3", component: <h1>man tab 3</h1>, active:false}
    ]
  },
  {
    id:"Database",
    children: [
      {childId: "Dat tab 1", component: <h1>Dat tab 1</h1>, active: true},
      {childId: "Dat tab 2", component: <h1>Dat tab 2</h1>, active:false},
      {childId: "Dat tab 3", component: <h1>Dat tab 3</h1>, active:false}
    ]
  },
  {
    id:"Analytics",
    children: [
      {childId: "Anal tab 1", component: <h1>Anal tab 1</h1>, active: true},
      {childId: "Anal tab 2", component: <h1>Anal tab 2</h1>, active:false},
      {childId: "Anal tab 3", component: <h1>Anal tab 3</h1>, active:false}
    ]
  }
]

interface HeaderProps {
  tabSelect: any// (input:React.FC) => void | any;
  selection: string;
  onDrawerToggle: () => void;
}

export default function Header(props: HeaderProps) {
  // Pull selection and onDrawerToggle from props
  const { tabSelect, selection, onDrawerToggle } = props;
  // get the header settings that match the current
  const headerSettings = headerOptions.find(item => item.id === selection)
   
  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>

          <Grid container spacing={1} alignItems="center">

            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>

            <Grid item xs />
            
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>

          </Grid>

        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {selection}
              </Typography>
            </Grid>
            
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={0} textColor="inherit">
          {headerSettings?.children.map(({childId, component, active}) => (
            <Tab  label={childId} onClick={() => tabSelect(component)}/>
          ))}
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}