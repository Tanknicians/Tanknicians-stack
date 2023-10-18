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
import { useAddUserMutation } from '../../redux/slices/users/userManagementSlice';
import { createUser, CreateUser } from '../../zodTypes';
import { MuiTelInput } from 'mui-tel-input';
import LoadingOverlay from '../LoadingOverlay';

export default function CreateUserModal({
  open,
  setOpen,
  isEmployee
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  isEmployee: boolean;
}) {
  const [addUser, { isLoading }] = useAddUserMutation();
  const { handleSubmit, control, reset, formState } = useForm<CreateUser>({
    resolver: zodResolver(createUser),
    defaultValues: {
      isEmployee: isEmployee,
      firstName: '',
      middleName: '',
      lastName: '',
      address: '',
      phone: ''
    } as CreateUser
  });

  function handleClose() {
    if (isLoading) return;
    setOpen(false);
    reset();
  }

  const onValid: SubmitHandler<CreateUser> = async (data) => {
    // console.log(data);

    try {
      const response = await addUser({ ...data });
      // console.log(response);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg'>
      {isLoading && <LoadingOverlay />}
      <DialogTitle>Add {isEmployee ? 'Employee' : 'Client'}</DialogTitle>
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
