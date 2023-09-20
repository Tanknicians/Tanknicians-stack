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
import { useEditUserMutation } from '../redux/slices/users/userManagementSlice';
import { UserOption } from '../redux/slices/users/userManagementSlice';

export const userSchema = z.object({
  id: z.number().int(),
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),

  isEmployee: z.boolean().default(false)
});

export const createUserSchema = userSchema.omit({ id: true });
export type CreateUser = z.infer<typeof createUserSchema>;

export default function EditUserModal({
  open,
  setOpen,
  userData,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  userData: UserOption | null;
}) {
  
  if(!userData){
    return null;
  }
    
  const [editUser, { isLoading }] = useEditUserMutation();
  const { handleSubmit, control, reset, formState } = useForm<UserOption>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
        id: userData?.id,
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
    setOpen(false);
    reset();
  }

  const onSubmit: SubmitHandler<UserOption> = async (data: UserOption) => {
    console.log("on submit: ", data);
    const editData = {...data, id: userData.id}
    console.log("Edit data: ", editData);
    try {
      const response = await editUser(editData);
      console.log("response" , response);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg'>
      <DialogTitle>Edit {userData?.isEmployee ? 'Employee' : 'Client'}'s Information</DialogTitle>
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
        <Button type='button' onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
