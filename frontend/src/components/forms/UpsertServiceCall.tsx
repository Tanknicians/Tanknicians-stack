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
import { Control, Controller, useForm } from 'react-hook-form';
import { createServiceCall, CreateServiceCall } from '../../zodTypes';

type CreateFormProps = {
  name: keyof CreateServiceCall;
  type: 'string' | 'number' | 'boolean' | 'date' | 'full';
  control: Control<CreateServiceCall>;
  size?: number;
  multiline?: boolean;
  required?: boolean;
};

function getLabel(input: string) {
  if (!input) return '';
  let result = input.charAt(0).toUpperCase() + input.slice(1);
  result = result.replace(/(?<!^)([A-Z])/g, ' $1');
  result = result.replace(/\b(For|Or|And)\b/g, (match) => match.toLowerCase());

  return result;
}

export function CreateForm({
  name,
  type,
  control,
  size,
  multiline,
  required
}: CreateFormProps) {
  const label = getLabel(name);

  if (type === 'boolean') {
    return (
      <Grid item xs={size ?? 4}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <FormControlLabel control={<Checkbox {...field} />} label={label} />
          )}
        />
      </Grid>
    );
  }
  return (
    <Grid item xs={size ?? 3}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <TextField
              error={!!fieldState.error}
              required={!!required}
              fullWidth
              multiline={!!multiline}
              type={type === 'full' ? 'string' : type}
              label={label}
              InputLabelProps={{ shrink: type === 'date' ? true : undefined }}
              {...field}
              value={field.value ?? ''}
            />
          );
        }}
      />
    </Grid>
  );
}

const createServiceCallFields: Record<
  keyof CreateServiceCall,
  Omit<CreateFormProps, 'name' | 'control'>
> = {
  employeeId: { type: 'number', required: true, size: 4 },
  tankId: { type: 'number', required: true, size: 4 },
  createdOn: { type: 'date', required: true, size: 4 },
  customerRequest: { type: 'string', size: 12 },
  employeeNotes: { type: 'string', size: 12 },

  notApprovedNotes: { type: 'string', multiline: true, size: 8 },
  notesUpdated: { type: 'date', size: 4 },
  alkalinity: { type: 'number', required: true },
  calcium: { type: 'number', required: true },
  nitrate: { type: 'number', required: true },
  phosphate: { type: 'number', required: true },

  ATOOperational: { type: 'boolean' },
  ATOReservoirFilled: { type: 'boolean' },
  chemFilterAdjusted: { type: 'boolean' },
  doserAdjustementOrManualDosing: { type: 'boolean' },
  dosingReservoirsFull: { type: 'boolean' },
  floorsCheckedForSpillsOrDirt: { type: 'boolean' },
  glassCleanedInside: { type: 'boolean' },
  glassCleanedOutside: { type: 'boolean' },
  mechFilterChanged: { type: 'boolean' },
  pumpsClearedOfDebris: { type: 'boolean' },
  saltCreepCleaned: { type: 'boolean' },
  skimmerCleanedAndOperational: { type: 'boolean' },
  waterChanged: { type: 'boolean' },
  waterTestedRecordedDated: { type: 'boolean' },

  pestAPresent: { type: 'boolean' },
  pestBPresent: { type: 'boolean' },
  pestCPresent: { type: 'boolean' },
  pestDPresent: { type: 'boolean' },
  isApproved: { type: 'boolean' }
};

const defaultValues: CreateServiceCall = Object.fromEntries(
  Object.entries(createServiceCallFields).map(([key, { type }]) => {
    switch (type) {
      case 'boolean':
        return [key, false];
      case 'date':
        return [key, new Date()];
      case 'string':
        return [key, ''];
      case 'number':
        return [key, 0];
      case 'full':
        return [key, ''];
    }
  })
);

export default function CreateServiceCallModal({
  open,
  setOpen,
  employeeId,
  tankId
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  employeeId: number;
  tankId: number;
}) {
  const { handleSubmit, control, reset } = useForm<CreateServiceCall>({
    resolver: zodResolver(createServiceCall),
    defaultValues: { ...defaultValues, tankId, employeeId }
  });

  function handleClose() {
    setOpen(false);
    reset();
  }

  function onValid(data: CreateServiceCall) {
    console.log('valid form');
    console.log(data);
  }

  const fields = (
    Object.keys(
      createServiceCallFields
    ) as (keyof typeof createServiceCallFields)[]
  )
    .map((key) => ({ name: key, ...createServiceCallFields[key] }))
    .filter((field) => field.name !== 'isApproved');

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg'>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} paddingTop={1}>
          {fields.map((field) => (
            <CreateForm key={field.name} control={control} {...field} />
          ))}
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
