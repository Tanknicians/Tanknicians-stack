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
import LoginImage1 from '../Assets/Images/LoginImage1.jpg'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../Services/authApiSlice';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { setCredentials } from '../Services/authSlice';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Link color="inherit" href="https://tanknicians.com/" target="_blank">
        Tanknicians
      </Link>{' '}
      {' © '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginPage() {
  // Hooks for API and Routing
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  // Error states to be checked for incorrect input
  const [isEmailError, setIsEmailError] = useState(false);
  const [isEmailRequired, setIsEmailRequired] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);

  // Error message
  const errorColor = '#d32f2f';
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoginError, setIsLoginError] = useState(false);

  // Allows errors to be cleared after user input
  const handleEmailChange = () => {
    setIsEmailError(false);
    setIsEmailRequired(false);
  };

  const handlePasswordChange = () => {
    setIsPasswordError(false);
    setIsPasswordRequired(false);
  };

  // Form submission with error checks
  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    // Get email and password from input
    const email = data.get('email');
    const password = data.get('password');
    
    // Check for missing input and show user error 
    if(!email)
    {
      setIsEmailError(true);
      setIsEmailRequired(true);
    }
    else if(!password)
    {
      setIsPasswordError(true);
      setIsPasswordRequired(true);
    }
    else
    {
      // Package user data to request access 
      const user = { 
        email: (email as String).trim(), 
        password: (password as String).trim()
      };
    
      // API call to login
      loginAttempt(user);
    }  
  };
  
  const loginAttempt = async (user: { email: string; password: string; }) => {
    try
    {
      const loginResponse = await login({email: user.email, password: user.password}).unwrap();
      console.log(loginResponse);

      // User exists, Log in 
      dispatch(setCredentials({...loginResponse, user}))
      navigate('/dashboard/Managerial');    
    }
    // Login failed
    catch (err)
    {
      setErrorMessage('Incorrect email or password.')
      setIsLoginError(true);
    }
  };

  const loginContent = isLoading ? <h1>Loading...</h1> : (
    <ThemeProvider theme={theme} >
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${LoginImage1})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square > 
          <Box
            sx={{
              mt: 8,
              mb: 10,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
             <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
             <InvertColorsOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required = {isEmailRequired}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleEmailChange}
                error={isEmailError || isLoginError}
                helperText={isEmailError ? 'Email is required*' : ''}
                InputProps={{
                  endAdornment: (isEmailError || isLoginError) && (
                    <InputAdornment position="end">
                      <IconButton edge="end" style={{pointerEvents: 'none'}}>
                        <ErrorOutlineIcon sx={{color: errorColor}}/>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required = {isPasswordRequired}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
                error={isPasswordError || isLoginError}
                helperText={isPasswordError ? 'Password is required*' : ''}
                InputProps={{
                  endAdornment: (isPasswordError || isLoginError) && (
                    <InputAdornment position="end">
                      <IconButton edge="end" style={{pointerEvents: 'none'}}>
                        <ErrorOutlineIcon sx={{color: errorColor}}/>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Typography
                align='center'
                style={{color: errorColor}}
              > {errorMessage}
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box >
          <Box sx={{my:4, mx: 4, display: 'flex'}}></Box>
          <Box component = 'footer' sx={{
            mt: 24,
            mx: 4,
            display: 'flex',
            justifyContent: 'center'
            }}>
              <Copyright sx={{bottom: '0', textAlign: 'center' }} /> 
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );

  return loginContent;
}