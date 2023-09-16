import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import React from 'react';
import { useAddTankToUserMutation } from '../Redux/slices/users/userManagementSlice';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import LoadingProgressButton from './LoadingProgressButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type CreateTankFormProps = {
  userId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const tankMetaDataSchema = z.object({
  id: z.number().int(),
  description: z.string().optional(),
  volume: z.coerce.number().int().positive(),
  type: z.enum(['FRESH', 'SALT', 'BRACKISH']),

  qrSymbol: z.number().int().positive(),

  tanknicianSourcedOnly: z.boolean(),
  lastDateServiced: z.date(),

  customerId: z.number().int()
});

export const createTank = tankMetaDataSchema.omit({
  id: true,
  qrSymbol: true,
  lastDateServiced: true
});

type CreateTankFormData = z.infer<typeof createTank>;

function CreateTankForm({ userId, open, setOpen }: CreateTankFormProps) {
  //API call to create tank
  const [addTankToUser, { isLoading }] = useAddTankToUserMutation();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateTankFormData>({
    resolver: zodResolver(createTank),
    defaultValues: {
      tanknicianSourcedOnly: false,
      customerId: userId
    }
  });

  console.log('Create Tank Form RHF Errors: ', errors);

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit: SubmitHandler<CreateTankFormData> = async (data) => {
    console.log(data);
    try {
      const response = await addTankToUser(data).unwrap();
      console.log('Response: ', response);
      handleClose();
    } catch (err: any) {
      console.log(err);
      if (!err?.status) {
        console.log('No Server Response');
      } else {
        console.log(
          `Submitting create tank form error ${err.status}: `,
          err.data?.error.issues
        );
      }
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth='lg'>
        <DialogTitle>Add Tank</DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            sx={{
              pt: 1
            }}
          >
            <Grid item xs={4}>
              <Controller
                name='volume'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    error={!!errors.volume}
                    fullWidth
                    label='Volume'
                    value={value ?? ''}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name='type'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel error={!!errors.type}>Tank Type</InputLabel>
                    <Select
                      error={!!errors.type}
                      label='Tank Type'
                      {...field}
                      value={field.value ?? ''}
                    >
                      <MenuItem value=''></MenuItem>
                      <MenuItem value='FRESH'>Fresh</MenuItem>
                      <MenuItem value='SALT'>Salt</MenuItem>
                      <MenuItem value='BRACKISH'>Brackish</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name='tanknicianSourcedOnly'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label='Tanknician Sourced'
                    labelPlacement='start'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='description'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    multiline
                    label='Description (Optional)'
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingProgressButton
            type='button'
            variant='contained'
            isLoading={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </LoadingProgressButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateTankForm;
