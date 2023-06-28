import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StatusBar } from 'expo-status-bar';
import { View, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import * as React from 'react';
import { z } from 'zod';
import { useLoginMutation } from '../redux/slices/auth/authApiSlice';
import { setCredentials } from '../redux/slices/auth/authSlice';
import { useDispatch } from 'react-redux';

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

type LoginFormData = {
  email: string;
  password: string;
};

// Form validation
const schema = z.object({
  email: z.string().nonempty(),
  password: z.string().nonempty()
});

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(schema)
  });

  console.log(errors);

  const onSubmit: SubmitHandler<LoginFormData> = async loginData => {
    console.log(loginData);
    try {
      const userData = await login(loginData).unwrap();
      console.log('success', userData);
      dispatch(setCredentials({ ...userData, loginData }));
    } catch (err: any) {
      console.log(err);
      // if (!err?.status) {
      //   // isLoading: true until timeout occurs
      //   setLoginError({
      //     errorMessage: 'No Server Response',
      //     isLoginError: true
      //   });
      // } else if (err?.status === 400) {
      //   setLoginError({ errorMessage: err.data?.message, isLoginError: true });
      // } else if (err?.status === 401) {
      //   setLoginError({ errorMessage: err.data?.message, isLoginError: true });
      // } else {
      //   setLoginError({ errorMessage: err.data?.message, isLoginError: true });
      // }
    }
  };

  return (
    <View style={style.container}>
      <Logo />
      <Text variant='displayLarge'>Tanknicians</Text>
      <Controller
        name='email'
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='Email Address'
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            style={style.textInput}
            mode='outlined'
            autoCorrect={false}
          />
        )}
      />
      {/* {errors?.email && <Text>This field is required.</Text>}
      <HelperText type='error' visible={!!errors?.email}>
        {errors?.email?.message}
      </HelperText> */}

      <Controller
        name='password'
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='Password'
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            style={style.textInput}
            mode='outlined'
            autoCorrect={false}
          />
        )}
      />
      {/* {errors.password && <Text>This field is required.</Text>} */}

      <Button
        mode='elevated'
        onPress={handleSubmit(onSubmit)}
        style={style.textInput}
      >
        Login
      </Button>
    </View>
  );
}
