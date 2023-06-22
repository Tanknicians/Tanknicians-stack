import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { View, Alert } from 'react-native';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Logo from '../components/Logo';
import { z } from 'zod';

const style = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: '80%'
  }
});

interface LoginFormData {
  email: string;
  password: string;
}

// Form validation
const schema = z.object({
  email: z.string().nonempty(),
  password: z.string().nonempty()
});

export default function Login() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(schema)
  });

  console.log(errors);

  const onSubmit: SubmitHandler<LoginFormData> = async data =>
    console.log(data);

  return (
    <View style={style.container}>
      <Logo />
      <Text variant='displayLarge'>Tanknicians</Text>
      {/* <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          )}
        name='email'
      /> */}
      <TextInput
        placeholder='Email Address'
        {...register('email', { required: true })}
        style={style.textInput}
        mode='outlined'
        autoCorrect={false}
      />
      {/* {errors?.email && <Text>This field is required.</Text>} */}
      {/* <HelperText type='error' visible={!!errors?.email}>
        {errors?.email?.message}
      </HelperText> */}
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='Password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={style.textInput}
            mode='outlined'
            autoCorrect={false}
          />
        )}
        name='password'
      />
      {/* {errors.password && <Text>This field is required.</Text>} */}

      <Button
        mode='elevated'
        onPress={handleSubmit(onSubmit)}
        style={style.textInput}
      >
        Submit
      </Button>
    </View>
  );
}
function zodResolver(
  schema: z.ZodObject<
    { email: z.ZodString; password: z.ZodString },
    'strip',
    z.ZodTypeAny,
    { email: string; password: string },
    { email: string; password: string }
  >
): import('react-hook-form').Resolver<LoginFormData, any> | undefined {
  throw new Error('Function not implemented.');
}
