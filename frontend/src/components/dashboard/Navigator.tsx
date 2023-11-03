import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import BadgeIcon from '@mui/icons-material/Badge';
import ListItem from '@mui/material/ListItem';
import LogoutDialog from '../LogoutDialog';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
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

interface NavProps extends Omit<DrawerProps, 'onClose'> {
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  selected: string;
}
export default function Navigator(props: NavProps) {
  const { onClose, selected, ...drawerProps } = props;
  const [openDialog, setOpenDialog] = useState(false);

  const dashboardFeatures = [
    {
      id: '',
      children: [
        {
          id: 'Approve Forms',
          icon: <BorderColorIcon />
        },
        {
          id: 'Clients',
          icon: <PeopleIcon />
        },
        {
          id: 'Tanks',
          icon: <ShowChartIcon />
        },
        {
          id: 'Employees',
          icon: <BadgeIcon />
        },
        {
          id: 'Data Export',
          icon: <ContentCopyIcon />
        }
      ]
    }
  ];

  const dashboardSettings = [
    {
      id: 'Logout',
      icon: <LogoutIcon sx={{ transform: 'rotate(-180deg)' }} />,
      onClick: () => {
        setOpenDialog(true);
      }
    }
  ];

  return (
    <Drawer variant='permanent' {...drawerProps} onClose={onClose}>
      <Stack
        sx={{ height: '100%' }}
        flexDirection='column'
        justifyContent='space-between'
      >
        <List disablePadding>
          <ListItem
            sx={{
              ...item,
              ...itemCategory,
              fontSize: 22,
              color: '#fff',
              '&:hover': 'none'
            }}
          >
            Tanknicians
          </ListItem>
          {dashboardFeatures.map(({ id, children }) => (
            <Box
              key={id}
              sx={{
                bgcolor: '#101F33',
                borderTop: 1,
                borderBottom: 1,
                borderColor: 'gray',
                paddingTop: 5.5,
                paddingBottom: 1
              }}
            >
              {/* <ListItem sx={{ py: 2, px: 3 }}>
                <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
              </ListItem> */}
              {children.map(({ id: childId, icon }) => (
                <ListItem disablePadding key={childId} sx={{ px: 0, py: 0.3 }}>
                  <Link
                    to={childId}
                    style={{ textDecoration: 'none', minWidth: '100%' }}
                  >
                    <ListItemButton selected={childId === selected} sx={item}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </Box>
          ))}
        </List>
        <List sx={{ paddingBottom: 2, borderTop: 1, borderColor: 'gray' }}>
          {dashboardSettings.map(({ id, icon, onClick }) => (
            <ListItem disablePadding key={id}>
              <ListItemButton sx={item} onClick={() => onClick()}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{id}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          <LogoutDialog open={openDialog} setOpen={setOpenDialog} />
        </List>
      </Stack>
    </Drawer>
  );
}
