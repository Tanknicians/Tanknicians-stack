import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, TouchableOpacity, Platform, Keyboard } from 'react-native';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useLoginMutation } from '../redux/slices/auth/authApiSlice';
import { PRIMARY_COLOR, getScreenDimensions } from '../types/Styling';
import { AuthLogin, errorSchema, authLogin } from '../types/zodTypes';
import { setCredentials } from '../redux/slices/auth/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { storeToken } from '../redux/slices/auth/authRefresh';
import LoadingSpinner from '../components/LoadingSpinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text, TextInput } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import Logo from '../components/Logo';
import styles from '../styles/login';

const LOGINERRORMESSAGE = 'Incorrect email/password combination';

const LoginScreen = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthLogin>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(authLogin)
  });

  console.log(errors);

  const onSubmit: SubmitHandler<AuthLogin> = async (loginData) => {
    try {
      const {
        token,
        refreshToken,
        savedCredentials: user
      } = await login(loginData).unwrap();

      // Save refresh token to AsyncStorage
      await storeToken(refreshToken);

      // No need to navigate to QRScannerScreen, as the user will be redirected to it
      // automatically by the App component
      dispatch(setCredentials({ token, user }));
    } catch (unparsedError) {
      const error = errorSchema.parse(unparsedError);
      // if error is not a zod error, it is a server error
      if (error instanceof Error) {
        console.log('Login error', error);
        return;
      }

      if (!error?.status) {
        // isLoading: true until timeout occurs
        setLoginErrorMessage('No Server Response');
      } else if (error?.status === 400) {
        console.log(`Login error ${error.status}: `, error.data?.message);
        setLoginErrorMessage(LOGINERRORMESSAGE);
      } else {
        console.log('Login error', error);
      }
    }
  };

  // TODO: implement feature
  // const onPressForgotPassword = () => {
  //   console.log("onPressForgotPassword Function not implemented.");
  // };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <SafeAreaView style={styles.loginContainer}>
        <StatusBar style='light' />
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
            render={({ field, fieldState }) => (
              <View style={styles.inputView}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  placeholder='Email Address'
                  onBlur={field.onBlur}
                  mode='outlined'
                  error={!!fieldState.error || !!loginErrorMessage}
                  onChangeText={field.onChange}
                  activeOutlineColor={PRIMARY_COLOR}
                  autoCorrect={false}
                  value={field.value}
                  autoCapitalize='none'
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
            render={({ field, fieldState }) => (
              <View style={styles.inputView}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  placeholder='Password'
                  onBlur={field.onBlur}
                  mode='outlined'
                  error={!!fieldState.error || !!loginErrorMessage}
                  onChangeText={field.onChange}
                  activeOutlineColor={PRIMARY_COLOR}
                  secureTextEntry={true}
                  autoCorrect={false}
                  value={field.value}
                  autoCapitalize='none'
                  disabled={isLoading} // Disable input while loading
                />
              </View>
            )}
          />
          {/* <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity
              onPress={onPressForgotPassword}
              disabled={isLoading}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View> */}
          {loginErrorMessage && (
            <Text style={styles.errorText}>{loginErrorMessage}</Text>
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
    </>
  );
};

export default LoginScreen;
