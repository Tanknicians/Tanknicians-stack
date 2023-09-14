import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import BadgeIcon from '@mui/icons-material/Badge';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { useState } from 'react';

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover': {
    bgcolor: 'rgba(255, 255, 255, 0.08)'
  }
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3
};

interface NavProps extends DrawerProps {
  selected: string;
}

export default function Navigator(props: NavProps) {
  
  const { selected, ...other } = props
  const [activeNavItem, setActiveNavItem] = useState(selected);

  const dashboardFeatures = [
    {
      id: 'Admin',
      children: [
        {
          id: 'Approve Forms',
          icon: <BorderColorIcon />,
          onClick: () => {
            setActiveNavItem('Approve Forms');
          }
        },
        {
          id: 'Employees',
          icon: <BadgeIcon />,
          onClick: () => {
            setActiveNavItem('Employees');
          }
        },
        {
          id: 'Clients',
          icon: <PeopleIcon />,
          onClick: () => {
            setActiveNavItem('Clients');
          }
        },
        {
          id: 'Tanks',
          icon: <ShowChartIcon />,
          onClick: () => {
            setActiveNavItem('Tanks');
          }
        },
        {
          id: 'Data Export',
          icon: <ContentCopyIcon />,
          onClick: () => {
            setActiveNavItem('Data Export');
          }
        }
      ]
    }
  ];

  return (
    <Drawer variant='permanent' {...props}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}
        >
          Tanknicians
        </ListItem>
        {dashboardFeatures.map(({ id, children }) => (
          
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, onClick }, index) => (
              <ListItem disablePadding key={childId}>
                <Link
                  to={childId}
                  style={{ textDecoration: 'none', minWidth: '100%' }}
                >
                  <ListItemButton
                    selected={childId === activeNavItem}
                    sx={item}
                    onClick={onClick}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
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
