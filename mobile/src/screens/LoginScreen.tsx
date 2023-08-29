import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  View,
  Alert,
  TouchableOpacity,
  Platform,
  Keyboard
} from 'react-native';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useLoginMutation } from '../redux/slices/auth/authApiSlice';
import { setCredentials } from '../redux/slices/auth/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingSpinner from '../components/LoadingSpinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text, TextInput } from 'react-native-paper';
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  ERROR_COLOR
} from '../types/Styling';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Logo from '../components/Logo';
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

const LoginScreen = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [loginError, setLoginError] = useState({
    errorMessage: '',
    isLoginError: false
  });
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
      const { token, savedCredentials } = userData;
      console.log('token: ', token);
      console.log('savedCredentials: ', savedCredentials);
      // No need to navigate to QRScannerScreen, as the user will be redirected to it
      // automatically by the App component
      dispatch(setCredentials({ user: savedCredentials, token }));
      console.log('Login successful.');
    } catch (err: any) {
      console.log(err);
      if (!err?.status) {
        // isLoading: true until timeout occurs
        setLoginError({
          errorMessage: 'No Server Response',
          isLoginError: true
        });
      } else {
        console.log(
          `Login error ${err.status}: `,
          err.data?.error.issues[0].message
        );
        setLoginError({
          errorMessage: err.data?.error.issues[0].message,
          isLoginError: true
        });
      }
    }
  };

  const onPressForgotPassword = () => {
    console.log('onPressForgotPassword Function not implemented.');
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <StatusBar style='light' />
      {isLoading && <LoadingSpinner />}
      <KeyboardAwareScrollView
        style={styles.keyboardAwareContainer}
        contentContainerStyle={styles.keyboardAwareContent}
        keyboardDismissMode='on-drag'
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps={'handled'}
        enableOnAndroid={true}
        scrollEnabled={false}
        enableAutomaticScroll={true}
        // Values below are not finalized
        extraScrollHeight={Platform.select({
          ios: 100,
          android: 120
        })}
      >
        <Logo />
        <Text style={styles.title} variant='displayLarge'>
          Tanknicians
        </Text>
        <Controller
          name='email'
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputView}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                placeholder='Email Address'
                onBlur={onBlur}
                mode='outlined'
                onChangeText={onChange}
                activeUnderlineColor={SECONDARY_COLOR}
                activeOutlineColor={PRIMARY_COLOR}
                outlineStyle={loginError.isLoginError && styles.errorInput}
                style={styles.inputText}
                autoCorrect={false}
                value={value}
                disabled={isLoading} // Disable input while loading
              />
            </View>
          )}
        />
        <Controller
          name='password'
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputView}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder='Password'
                onBlur={onBlur}
                mode='outlined'
                onChangeText={onChange}
                activeUnderlineColor={SECONDARY_COLOR}
                activeOutlineColor={PRIMARY_COLOR}
                outlineStyle={loginError.isLoginError && styles.errorInput}
                style={styles.inputText}
                secureTextEntry={true}
                autoCorrect={false}
                value={value}
                disabled={isLoading} // Disable input while loading
              />
            </View>
          )}
        />
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity
            onPress={onPressForgotPassword}
            disabled={isLoading}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        {loginError?.isLoginError && (
          <Text style={styles.errorText}>{loginError.errorMessage}</Text>
        )}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            handleSubmit(onSubmit)();
            Keyboard.dismiss();
          }}
          disabled={isLoading}
        >
          <Text style={styles.submitButtonText}>Login</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    position: 'relative'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: TERTIARY_COLOR,
    marginTop: 14,
    marginBottom: 18,
    paddingBottom: 8
  },
  errorInput: {
    borderColor: ERROR_COLOR,
    borderWidth: 3
  },
  errorText: {
    color: ERROR_COLOR,
    fontSize: 16
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 20
  },
  forgotPasswordText: {
    color: TERTIARY_COLOR,
    fontSize: 14,
    textDecorationLine: 'underline'
  },
  keyboardAwareContainer: {
    flex: 1
  },
  keyboardAwareContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: TERTIARY_COLOR,
    fontSize: 16
  },
  inputView: {
    width: '100%',
    marginVertical: 10,
    justifyContent: 'center'
  },
  inputText: {},
  submitButton: {
    width: '80%',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 10
  },
  submitButtonText: {
    color: TERTIARY_COLOR,
    fontSize: 20
  }
});

export default LoginScreen;
