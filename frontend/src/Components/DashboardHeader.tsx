import ServiceForm from './DashboardContent/ServiceFormsFunctionality/ServiceForm'
import NotificationsIcon from '@mui/icons-material/Notifications'
import TabPanel from './DashboardContent/TabPanel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import HelpIcon from '@mui/icons-material/Help'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useState } from 'react'
import * as React from 'react'
import { Box } from '@mui/material'

const lightColor = 'rgba(255, 255, 255, 0.7)'

// ChildId acts as Label for tab
const headerOptions = [
  {
    id: 'Service Forms',
    children: [
      { childId: 'Flagged Forms', active: 0 },
      { childId: 'Create Service Call Form', active: 1 }
    ]
  },
  {
    id: 'Employees',
    children: [{ childId: 'Review Employees', active: 0 }]
  },
  {
    id: 'Clients',
    children: [{ childId: 'Review Clients', active: 0 }]
  },
  {
    id: 'Analytics',
    children: [
      { childId: 'Review Core Tank Charts', active: 0 },
      { childId: 'Create Custom Chart', active: 1 }
    ]
  },
  {
    id: 'Data Export',
    children: [{ childId: 'View and Export Data', active: 0 }]
  }
]

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

type HeaderProps = {
  // tabSelect: any; // (input:React.FC) => void | any; // any until
  selection: string
}

export default function Header(props: HeaderProps) {
  // Pull selection and onDrawerToggle from props
  // const { tabSelect, selection } = props;
  const { selection } = props

  // get the header settings that match the current
  const headerSettings = headerOptions.find((item) => item.id === selection)

  // State for tracking current active tab for STYLING
  const [activeIndex, setActiveIndex] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveIndex(newValue)
  }

  return (
    <React.Fragment>
      <AppBar
        component='div'
        color='primary'
        position='sticky'
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems='center' spacing={1}>
            <Grid item xs>
              <Typography color='inherit' variant='h5' component='h1'>
                {selection}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeIndex}
          onChange={handleChange}
          aria-label='admin tabs'
        >
          {headerSettings?.children.map(({ childId, active }) => (
            <Tab key={childId} label={childId} {...a11yProps(active)} />
          ))}
        </Tabs>
      </Box>

      {/* {headerSettings?.children.map(({ childId, component, active }) => (
        <TabPanel key={childId} value={activeIndex} index={active}>
          {component}
        </TabPanel>
      ))} */}
    </React.Fragment>
  )
}
