import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import InvertColorsOutlinedIcon from '@mui/icons-material/InvertColorsOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { setCredentials } from '../Redux/slices/auth/authSlice';
import loginRandomImages from '../Components/LoginPageRandomImage';
import { useLoginMutation } from '../Redux/slices/auth/authApiSlice';

function Copyright(props: { [k: string]: unknown }) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      <Link color='inherit' href='https://tanknicians.com/' target='_blank'>
        Tanknicians
      </Link>{' '}
      {' © '}
      {new Date().getFullYear()}
    </Typography>
  );
}

// Styling for LoginPage components
const theme = createTheme();

// For random images to display
const randomImagePath =
  loginRandomImages[Math.floor(Math.random() * loginRandomImages.length)];
const randomImage = require(`../Assets/Images/${randomImagePath}`);

export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();

  // Hooks for API and Routing
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // FIXME:
  // Implement some feature while isLoading

  // Error states to be checked for incorrect input
  const [emailAttempt, setEmailError] = useState({
    isRequired: false,
    isEmailError: false
  });
  const [passwordAttempt, setPasswordError] = useState({
    isRequired: false,
    isPasswordError: false
  });

  // Error message for login attempt
  const errorColor = '#d32f2f';
  const [loginError, setLoginError] = useState({
    errorMessage: '',
    isLoginError: false
  });

  // Allows email and password errors to be cleared after user input
  const handleEmailChange = () => {
    setEmailError({ isRequired: false, isEmailError: false });
    setLoginError(prevState => ({ ...prevState, isLoginError: false }));
  };

  const handlePasswordChange = () => {
    setPasswordError({ isRequired: false, isPasswordError: false });
    setLoginError(prevState => ({ ...prevState, isLoginError: false }));
  };

  // Form submission with error checks
  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Get email and password from input
    const email = data.get('email');
    const password = data.get('password');

    // Check for missing input and show user error
    if (!email) {
      setEmailError({ isRequired: true, isEmailError: true });
    } else if (!password) {
      setPasswordError({ isRequired: true, isPasswordError: true });
    } else {
      // Package user data to request access
      const user = {
        email: (email as String).trim(),
        password: (password as String).trim()
      };

      // API call to login
      loginAttempt(user);
    }
  };

  const loginAttempt = async (user: { email: string; password: string }) => {
    const { email, password } = user;

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, user }));

      navigate('/dashboard');
    } catch (err) {
      // if (!err?.originalStatus) {
      //     // isLoading: true until timeout occurs
      //     setErrMsg('No Server Response');
      // } else if (err.originalStatus === 400) {
      //     setErrMsg('Missing Username or Password');
      // } else if (err.originalStatus === 401) {
      //     setErrMsg('Unauthorized');
      // } else {
      //     setErrMsg('Login Failed');
      // }
      console.log(err);
      // errRef.current.focus();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${randomImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: t =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              mt: 8,
              mb: 10,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <InvertColorsOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Log in
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleLoginSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required={emailAttempt.isRequired}
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                onChange={handleEmailChange}
                error={emailAttempt.isEmailError || loginError.isLoginError}
                helperText={
                  emailAttempt.isEmailError ? 'Email is required*' : ''
                }
                InputProps={{
                  endAdornment: (emailAttempt.isEmailError ||
                    loginError.isLoginError) && (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        style={{ pointerEvents: 'none' }}
                        tabIndex={parseInt('-1')}
                      >
                        <ErrorOutlineIcon sx={{ color: errorColor }} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                margin='normal'
                required={passwordAttempt.isRequired}
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={handlePasswordChange}
                error={
                  passwordAttempt.isPasswordError || loginError.isLoginError
                }
                helperText={
                  passwordAttempt.isPasswordError ? 'Password is required*' : ''
                }
                InputProps={{
                  endAdornment: (passwordAttempt.isPasswordError ||
                    loginError.isLoginError) && (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        style={{ pointerEvents: 'none' }}
                        tabIndex={parseInt('-1')}
                      >
                        <ErrorOutlineIcon sx={{ color: errorColor }} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Typography align='center' style={{ color: errorColor }}>
                {' '}
                {loginError.errorMessage}
              </Typography>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ my: 4, mx: 4, display: 'flex' }} />
          <Box
            component='footer'
            sx={{
              mt: 24,
              mx: 4,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Copyright sx={{ bottom: '0', textAlign: 'center' }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
