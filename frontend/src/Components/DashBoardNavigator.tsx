import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useState } from 'react' 
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BadgeIcon from '@mui/icons-material/Badge';

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator( props: DrawerProps) {
  
  // Admin features represents a list of panels that contain content.
  // Our list has one panel, "Admin".
  // Admin has three children, each with a text label, icon, and highlight state: active or not active.
  const [activeIndex, setActiveIndex] = useState(0);

  const dashboardFeatures = [
    {
      // In the future, other listitems->children-> onclick functions should have arguments starting at 3 then 4 etc.
      id: 'Admin',
      children: [
        { 
          id: 'Service Forms', 
          icon: <BorderColorIcon />,
          onClick: () => { setActiveIndex(0) }
        },
        { 
          id: 'Employees',
          icon: <BadgeIcon />,
          onClick: () => { setActiveIndex(1) }
        },
        { 
          id: 'Clients',
          icon: <PeopleIcon />,
          onClick: () => { setActiveIndex(2) }
        },
        { 
          id: 'Analytics',
          icon: <ShowChartIcon />,
          onClick: () => { setActiveIndex(3) }
        },
        { 
          id: 'Data Export',
          icon: <ContentCopyIcon />,
          onClick: () => { setActiveIndex(4) }
        },
      ]
    }
  ];

  return (
    <Drawer variant="permanent" {...props}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          Tanknicians
        </ListItem>
        {dashboardFeatures.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, onClick }, index) => (
              <ListItem disablePadding key={childId} >
                <Link to = {childId} style = {{textDecoration: 'none', minWidth: '100%'}}>
                  {/* onclick, set state "activeIndex" to whichever Feature is currently selected*/}
                  {/* If curr map index is equal to the state "activeIndex", set selected to true, else set to false */}
                  <ListItemButton selected={index === activeIndex} sx={item} onClick={onClick}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText >{childId}</ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}