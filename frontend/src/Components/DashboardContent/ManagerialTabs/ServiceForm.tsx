import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import LoadingProgressButton from '../../LoadingProgressButton';
import {
  serviceFormFieldQuestionsBoolean,
  serviceFormFieldQuestionsNumeric,
  ServiceFormData,
  serviceFormSchema
} from './serviceFormTypesandData';
import { useState } from 'react';

export default function ServiceForm() {
  // form Mutation will go here
  const [isLoading, setIsLoading] = useState(false);

  const { control, register, handleSubmit, formState } =
    useForm<ServiceFormData>({
      defaultValues: {
        ATOOperational: false,
        ATOReservoirFilled: false,
        chemFilterAdjusted: false,
        doserAdjustementOrManualDosing: false,
        dosingReservoirsFull: false,
        floorsCheckedForSpillsOrDirt: false,
        glassCleanedInside: false,
        glassCleanedOutside: false,
        mechFilterChanged: false,
        pumpsClearedOfDebris: false,
        saltCreepCleaned: false,
        skimmerCleanedAndOperational: false,
        waterChanged: false,
        pestAPresent: false,
        pestBPresent: false,
        pestCPresent: false,
        pestDPresent: false
      },
      resolver: zodResolver(serviceFormSchema)
    });

  const { errors } = formState;

  const onSubmit: SubmitHandler<ServiceFormData> = (data: any) => {
    console.log(data);
  };

  // Only allow numbers and decimal points
  const handleKeyDown = (event: any) => {
    const isValidKey =
      /[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab|\./.test(event.key);

    if (!isValidKey) {
      event.preventDefault();
    }
  };

  const renderedServiceFormQuestionsNumeric =
    serviceFormFieldQuestionsNumeric.map(({ id, label }, index) => (
      <TextField
        key={id}
        autoFocus={index === 0}
        id={`${id}-input`}
        label={label}
        margin='normal'
        {...register(id, { valueAsNumber: true })}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyDown={handleKeyDown}
        required={!!errors?.[id]}
        error={!!errors?.[id]}
        helperText={errors?.[id]?.message}
      />
    ));

  const renderedServiceFormQuestionsBoolean =
    serviceFormFieldQuestionsBoolean.map(({ id, label }) => (
      <FormControl key={id}>
        <FormLabel id={`${id}-controlled-radio-buttons-group`}>
          {label}
        </FormLabel>
        <Controller
          rules={{ required: true }}
          control={control}
          name={id}
          render={({ field }) => (
            <RadioGroup
              row
              aria-labelledby={`${label}-controlled-radio-buttons-group`}
              {...field}
            >
              <FormControlLabel value='false' control={<Radio />} label='No' />
              <FormControlLabel value='true' control={<Radio />} label='Yes' />
            </RadioGroup>
          )}
        />
      </FormControl>
    ));

  return (
    // temporary styling
    <Box
      sx={{
        height: '100vh'
      }}
    >
      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        {/* Questions with expected numeric answers */}
        {renderedServiceFormQuestionsNumeric}
        {/* Questions with expected boolean answers */}
        {renderedServiceFormQuestionsBoolean}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <LoadingProgressButton
            type='submit'
            variant='contained'
            sx={{ mt: 2, mb: 2 }}
            isLoading={isLoading}
          >
            Next
          </LoadingProgressButton>
        </Box>
      </Box>
    </Box>
  );
}
