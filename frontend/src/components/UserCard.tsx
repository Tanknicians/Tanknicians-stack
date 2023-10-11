import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { UserData } from '../redux/slices/users/userManagementSlice';
import { useState } from 'react';
import EditUserModal from './forms/EditUser';

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
      <Paper elevation={2}>
        {user && (
          <>
            <Typography variant='subtitle1' component='h2'>
              {`${user.firstName} ${user.middleName} ${user.lastName}`}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              {user.address}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              {user.phone}
            </Typography>
          </>
        )}

        <Button variant='contained' onClick={handleOpenUserModal}>
          <ModeEditOutlineOutlinedIcon />
        </Button>
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
