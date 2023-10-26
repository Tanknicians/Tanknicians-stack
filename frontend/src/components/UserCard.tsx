import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { UserData } from '../redux/slices/users/userManagementSlice';
import { useState } from 'react';
import EditUserModal from './forms/EditUser';
import { Grid, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import AddressIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';

export interface UserCardProps {
  user: UserData | null;
}

export default function UserCard(props: UserCardProps) {
  const { user } = props;
  const [userModalOpen, setUserModalOpen] = useState(false);

  const handleOpenUserModal = () => {
    handleClose();
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

  if (!user) return null;

  return (
    <>
      <Paper elevation={3}>
        <Grid
          container
          maxWidth={'100%'}
          padding={1}
          alignItems={{ lg: 'center' }}
        >
          <Grid container item xs={10}>
            <Grid item xs={12} md={3}>
              <Typography
                padding={1}
                variant='subtitle1'
                component='h2'
                sx={{ display: 'flex' }}
                alignItems='center'
              >
                <PersonIcon sx={{ marginRight: '5' }} />
                {`${user.firstName} ${user.middleName} ${user.lastName}`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography
                padding={1}
                variant='subtitle1'
                component='h2'
                sx={{ display: 'flex' }}
                alignItems='center'
              >
                <AddressIcon sx={{ marginRight: '5' }} />
                {user.address}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography
                padding={1}
                variant='subtitle1'
                component='h2'
                sx={{ display: 'flex' }}
                alignItems='center'
              >
                <PhoneIcon sx={{ marginRight: '5' }} />

                {user.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography
                padding={1}
                variant='subtitle1'
                component='h2'
                sx={{ display: 'flex' }}
                alignItems='center'
              >
                <EmailIcon sx={{ marginRight: '5' }} />

                {user.email}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'start'
            }}
          >
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
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleOpenUserModal}>Edit</MenuItem>
            </Menu>
          </Grid>
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
