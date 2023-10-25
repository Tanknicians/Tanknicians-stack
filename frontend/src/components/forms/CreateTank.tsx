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
import { useAddTankToUserMutation } from '../../redux/slices/tanks/tankDataSlice';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateTankMetaData,
  UpdateTankMetaData,
  createTank,
  tankSchema
} from '../../zodTypes';
import LoadingOverlay from '../LoadingOverlay';
import { useUpdateTankMutation } from '../../redux/slices/tanks/tankDataSlice';

function CreateTankForm({
  userId,
  open,
  setOpen,
  previousTank
}: {
  userId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  previousTank?: tankSchema;
}) {
  //API call to create/update tank
  const [addTankToUser, { isLoading: isCreateLoading }] =
    useAddTankToUserMutation();
  const [updateTank, { isLoading: isUpdateLoading }] = useUpdateTankMutation();

  // defaultValues for create tank form
  const defaultValues: CreateTankMetaData = {
    customerId: userId,
    tanknicianSourcedOnly: false,
    type: 'BRACKISH',
    volume: 0,
    nickname: ''
  };

  // If previous tank is passed in, use it as default values for edit tank
  if (previousTank) {
    defaultValues.volume = previousTank.volume;
    defaultValues.type = previousTank.type;
    defaultValues.tanknicianSourcedOnly = previousTank.tanknicianSourcedOnly;
    defaultValues.nickname = previousTank.nickname;
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateTankMetaData>({
    resolver: zodResolver(createTank),
    defaultValues: {
      ...defaultValues,
      customerId: userId
    } as CreateTankMetaData
  });

  console.log('Create Tank Form RHF Errors: ', errors);

  const isLoading = isCreateLoading || isUpdateLoading;

  const handleClose = () => {
    if (isLoading) return;
    reset();
    setOpen(false);
  };

  const onValid: SubmitHandler<CreateTankMetaData> = async (data) => {
    try {
      const response = previousTank
        ? await updateTank({
            id: previousTank.id,
            qrSymbol: previousTank.qrSymbol,
            lastDateServiced: previousTank.lastDateServiced,
            ...data
          }).unwrap()
        : await addTankToUser(data).unwrap();
      handleClose();
    } catch (err) {
      console.log('Submitting create tank form error: ', err);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth='lg'>
        {isLoading && <LoadingOverlay />}
        <DialogTitle>{previousTank ? 'Edit Tank' : 'Add Tank'}</DialogTitle>
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
                    type='number'
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
                      <MenuItem value='' />
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
                    control={<Checkbox {...field} checked={field.value} />}
                    label='Tanknician Sourced'
                    labelPlacement='start'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='nickname'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField fullWidth multiline label='Nickname' {...field} />
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
    </>
  );
}

export default CreateTankForm;
