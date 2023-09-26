import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAddUserMutation } from '../../redux/slices/users/userManagementSlice';
import { createUserSchema, CreateUser } from '../../zodTypes';

// export const userSchema = z.object({
//   id: z.number().int(),
//   firstName: z.string().optional(),
//   middleName: z.string().optional(),
//   lastName: z.string().optional(),
//   address: z.string().optional(),
//   phone: z.string().optional(),

//   isEmployee: z.boolean().default(false)
// });

// export const createUserSchema = userSchema.omit({ id: true });
// export type CreateUser = z.infer<typeof createUserSchema>;

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
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      isEmployee: isEmployee
    }
  });
  console.log({ formState });

  function handleClose() {
    setOpen(false);
    reset();
  }

  const onValid: SubmitHandler<CreateUser> = async (data) => {
    console.log(data);

    try {
      const response = await addUser({ ...data });
      console.log(response);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg'>
      <DialogTitle>Add {isEmployee ? 'Employee' : 'Client'}</DialogTitle>
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
