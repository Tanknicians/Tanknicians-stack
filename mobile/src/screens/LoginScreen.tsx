import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useLoginMutation } from '../redux/slices/auth/authApiSlice';
import { setCredentials } from '../redux/slices/auth/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Alert, TouchableOpacity } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { MAIN_COLOR } from '../types/Constants';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Routes } from '../types/Routes';
import Logo from '../components/Logo';
import * as React from 'react';
import { z } from 'zod';

type LoginFormData = {
  email: string;
  password: string;
};

// Form validation
const schema = z.object({
  email: z.string().nonempty(),
  password: z.string().nonempty()
});

type Props = NativeStackScreenProps<Routes, 'LoginScreen'>;

const LoginScreen = ({ navigation }: Props) => {
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

      const { token, savedCredentials } = userData;

      dispatch(setCredentials({ user: savedCredentials, token }));
      navigation.replace('QRScannerScreen');
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
    <SafeAreaView style={style.loginContainer}>
      <Logo />
      <Text style={style.title} variant='displayLarge'>
        Tanknicians
      </Text>
      <>
        <View style={style.inputView}>
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
                activeUnderlineColor={MAIN_COLOR}
                autoCorrect={false}
              />
            )}
          />
          {/* {errors?.email && <Text>This field is required.</Text>}
      <HelperText type='error' visible={!!errors?.email}>
      {errors?.email?.message}
    </HelperText> */}
        </View>
        <View style={style.inputView}>
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
                secureTextEntry={true}
                style={style.textInput}
                activeUnderlineColor={MAIN_COLOR}
                autoCorrect={false}
              />
            )}
          />
          {/* {errors.password && <Text>This field is required.</Text>} */}
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={style.submitButton}
        >
          <Text style={style.submitButtonText}>Login</Text>
        </TouchableOpacity>
      </>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: MAIN_COLOR,
    marginTop: 10,
    marginBottom: 40
  },
  inputView: {
    width: '80%',
    backgroundColor: '#ccc',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  },
  textInput: {
    height: 30,
    backgroundColor: 'inherit'
  },
  submitButton: {
    width: '80%',
    backgroundColor: MAIN_COLOR,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  submitButtonText: {
    color: 'white',
    fontSize: 20
  },
  header: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    backgroundColor: 'grey',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});

export default LoginScreen;
