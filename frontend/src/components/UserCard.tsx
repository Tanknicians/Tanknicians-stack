import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { UserData } from '../redux/slices/users/userManagementSlice';
import { useState } from 'react';
import EditUserModal from './forms/EditUser';
import { Grid } from '@mui/material';

export interface UserCardProps {
  user: UserData | null;
}

export default function UserCard(props: UserCardProps) {
  const { user } = props;
  const [userModalOpen, setUserModalOpen] = useState(false);

  const handleOpenUserModal = () => {
    console.log(user);
    setUserModalOpen((prevState) => !prevState);
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
              <Grid item xs={2} sx={{ height: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: {
                      md: 'flex-end',
                    },
                  }}
                >
                  <Button variant='contained' onClick={handleOpenUserModal}>
                    <ModeEditOutlineOutlinedIcon />
                  </Button>
                </Box>
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
