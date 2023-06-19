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
import { z } from 'zod';
import LoadingProgressButton from '../../LoadingProgressButton';
import { useState } from 'react';

interface ServiceFormData {
  alkalinity: number;
  calcium: number;
  nitrate: number;
  phosphate: number;
  ATOOperational: boolean;
  ATOReservoirFilled: boolean;
}

const schema = z.object({
  alkalinity: z.number(),
  calcium: z.number(),
  nitrate: z.number(),
  phosphate: z.number(),
  ATOOperational: z.boolean(),
  ATOReservoirFilled: z.boolean()
});

export default function ServiceForms() {
  // form Mutation will go here
  const [isLoading, setIsLoading] = useState(false);

  const { control, register, handleSubmit, formState } =
    useForm<ServiceFormData>({
      defaultValues: {
        ATOOperational: false,
        ATOReservoirFilled: false
      },
      resolver: zodResolver(schema)
    });

  const { errors } = formState;

  console.log(errors);

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
          flexDirection: 'column',
          overflow: 'scroll-y'
        }}
      >
        <TextField
          autoFocus
          id='alkalinty-input'
          label='Alkalinity'
          margin='normal'
          {...register('alkalinity')}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onKeyDown={handleKeyDown}
          //   required={loginError.isLoginError}
          //   error={loginError.isLoginError}
        />
        <TextField
          id='calcium-input'
          label='Calcium'
          margin='normal'
          {...register('calcium')}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onKeyDown={handleKeyDown}
          //   required={loginError.isLoginError}
          //   error={loginError.isLoginError}
        />
        <TextField
          id='nitrate-input'
          label='Nitrate'
          margin='normal'
          {...register('nitrate')}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onKeyDown={handleKeyDown}
          //   required={loginError.isLoginError}
          //   error={loginError.isLoginError}
        />
        <TextField
          id='phosphate-input'
          label='Phosphate'
          margin='normal'
          {...register('phosphate')}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onKeyDown={handleKeyDown}
          //   required={loginError.isLoginError}
          //   error={loginError.isLoginError}
        />
        <FormControl>
          <FormLabel id='ATOOperational-controlled-radio-buttons-group'>
            ATOOperational
          </FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            name='ATOOperational'
            render={({ field }) => (
              <RadioGroup
                row
                aria-labelledby='ATOOperational-controlled-radio-buttons-group'
                {...field}
                //   value={value}
                //   onChange={handleChange}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label='No'
                />
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label='Yes'
                />
              </RadioGroup>
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel id='ATOReservoirFilled-controlled-radio-buttons-group'>
            ATOReservoirFilled
          </FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            name='ATOReservoirFilled'
            render={({ field }) => (
              <RadioGroup
                row
                aria-labelledby='ATOReservoirFilled-controlled-radio-buttons-group'
                {...field}
                //   value={value}
                //   onChange={handleChange}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label='No'
                />
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label='Yes'
                />
              </RadioGroup>
            )}
          />
        </FormControl>
      </Box>
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
  );
}
