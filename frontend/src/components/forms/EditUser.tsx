import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEditUserMutation } from '../../redux/slices/users/userManagementSlice';
import { UserWithTanks } from '../../redux/slices/users/userManagementSlice';
import { updateUser } from '../../zodTypes';

export default function EditUserModal({
  open,
  setOpen,
  userData
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  userData: UserWithTanks | null;
}) {
  if (!userData) {
    return null;
  }
  console.log(userData);

  const [editUser, { isLoading }] = useEditUserMutation();
  //TODO: use isloading to show loading progress button

  const { handleSubmit, control, reset, formState } = useForm<
    Omit<UserWithTanks, 'id'>
  >({
    resolver: zodResolver(updateUser),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      address: '',
      phone: '',
      isEmployee: false
    }
  });

  function handleClose() {
    setOpen(false);
    reset();
  }

  const onValid: SubmitHandler<Omit<UserWithTanks, 'id'>> = async (data) => {
    console.log({ data });
    try {
      const response = await editUser({ ...data, id: userData.id });
      console.log('response', response);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg'>
      <DialogTitle>
        Edit {userData?.isEmployee ? 'Employee' : 'Client'}'s Information
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} paddingTop={1}>
          <Grid item xs={4}>
            <Controller
              name='firstName'
              control={control}
              render={({ field }) => (
                <TextField fullWidth label='First Name' {...field} />
              )}
            />
          </Grid>

          <Grid item xs={4}>
            <Controller
              name='middleName'
              control={control}
              render={({ field }) => (
                <TextField fullWidth label='Middle Name' {...field} />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name='lastName'
              control={control}
              render={({ field }) => (
                <TextField fullWidth label='Last Name' {...field} />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name='address'
              control={control}
              render={({ field }) => (
                <TextField fullWidth label='Address' {...field} />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <TextField fullWidth label='Phone Number' {...field} />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type='button' onClick={handleSubmit(onValid)}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
