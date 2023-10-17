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
import { UserData } from '../../redux/slices/users/userManagementSlice';
import { updateUser } from '../../zodTypes';
import { MuiTelInput } from 'mui-tel-input';
import LoadingOverlay from '../LoadingOverlay';

export default function EditUserModal({
  open,
  setOpen,
  userData
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  userData: UserData | null;
}) {
  if (!userData) {
    return null;
  }

  const [editUser, { isLoading }] = useEditUserMutation();
  const { handleSubmit, control, reset, formState } = useForm<UserData>({
    resolver: zodResolver(updateUser),
    defaultValues: {
      firstName: userData?.firstName,
      middleName: userData?.middleName,
      lastName: userData?.lastName,
      address: userData?.address,
      phone: userData?.phone,
      isEmployee: userData?.isEmployee
    }
  });
  console.log({ formState });

  function handleClose() {
    if (isLoading) return;
    setOpen(false);
    reset();
  }

  const onValid: SubmitHandler<UserData> = async (data: UserData) => {
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
      {isLoading && <LoadingOverlay />}
      <DialogTitle>
        Edit {userData?.isEmployee ? 'Employee' : 'Client'}'s Information
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} paddingTop={1}>
          <Grid item xs={4}>
            <Controller
              name='firstName'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label='First Name'
                  error={!!error}
                  {...field}
                />
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
                <MuiTelInput fullWidth label='Phone Number' {...field} />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type='button'
          onClick={handleSubmit(onValid)}
          variant='contained'
          disabled={isLoading}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
