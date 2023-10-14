import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { UserData } from '../redux/slices/users/userManagementSlice';
import { useState } from 'react';
import EditUserModal from './forms/EditUser';
import { Grid, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface UserCardProps {
  user: UserData | null;
}

export default function UserCard(props: UserCardProps) {
  const { user } = props;
  const [userModalOpen, setUserModalOpen] = useState(false);

  const handleOpenUserModal = () => {
    console.log(user);
    handleClose()
    setUserModalOpen((prevState) => !prevState);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Paper elevation={3}>
        <Grid container maxWidth={'100%'}>
          {user && (
            <>
              <Grid item xs={10} md={3}>
                <Typography
                  sx={{ padding: 1 }}
                  variant='subtitle1'
                  component='h2'
                >
                  {`${user.firstName} ${user.middleName} ${user.lastName}`}
                </Typography>
              </Grid>
              <Grid item xs={10} md={4}>
                <Typography
                  sx={{ padding: 1 }}
                  variant='subtitle1'
                  component='h2'
                >
                  {user.address}
                </Typography>
              </Grid>
              <Grid item xs={10} md={3}>
                <Typography
                  sx={{ padding: 1 }}
                  variant='subtitle1'
                  component='h2'
                >
                  {user.phone}
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                <IconButton
                  aria-label='more'
                  id='long-button'
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup='true'
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={handleOpenUserModal}
                  >
                    Edit
                  </MenuItem>
                </Menu>

              </Grid>
            </>
          )}
        </Grid>
      </Paper>
      {userModalOpen && (
        <EditUserModal
          open={userModalOpen}
          setOpen={setUserModalOpen}
          userData={user}
          key={user?.id}
        />
      )}
    </>
  );
}
