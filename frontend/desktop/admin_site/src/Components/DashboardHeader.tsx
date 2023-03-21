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
import {useState} from 'react'
import { type } from 'os';

const lightColor = 'rgba(255, 255, 255, 0.7)';

// ChildId acts as Label for tab
const headerOptions = [
  {
    id:"Managerial",
    children: [
      {childId: "ServiceForms", component: ServiceForms, active: 0},
      {childId: "Man tab 2", component: <h1>man tab 2</h1>, active:1},
      {childId: "Man tab 3", component: <h1>man tab 3</h1>, active:2}
    ]
  },
  {
    id:"Database",
    children: [
      {childId: "Dat tab 1", component: <h1>Dat tab 1</h1>, active: 0},
      {childId: "Dat tab 2", component: <h1>Dat tab 2</h1>, active:1},
      {childId: "Dat tab 3", component: <h1>Dat tab 3</h1>, active:2}
    ]
  },
  {
    id:"Analytics",
    children: [
      {childId: "Anal tab 1", component: <h1>Anal tab 1</h1>, active: 0},
      {childId: "Anal tab 2", component: <h1>Anal tab 2</h1>, active:1},
      {childId: "Anal tab 3", component: <h1>Anal tab 3</h1>, active:2}
    ]
  }
]

type HeaderProps = {
  tabSelect: any, // (input:React.FC) => void | any; // any until
  selection: string,
  onDrawerToggle: () => void
}

export default function Header(props: HeaderProps) {
  // Pull selection and onDrawerToggle from props
  const { tabSelect, selection, onDrawerToggle } = props;
  // get the header settings that match the current
  const headerSettings = headerOptions.find(item => item.id === selection)

  // State for tracking current active tab for STYLING
  const [activeIndex, setActiveIndex] = useState(0)

  // When clicking a tab, invoke this function to select the tab and change the styling to indicate active tab
  const choseTab = (input: any, index: number) =>{
    tabSelect(input)
    setActiveIndex(index)
  }
   
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
        <Tabs value={activeIndex} textColor="inherit">
          {headerSettings?.children.map(({childId, component, active}) => (
            <Tab label={childId} onClick={() => choseTab(component, active)}/>
          ))}
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}