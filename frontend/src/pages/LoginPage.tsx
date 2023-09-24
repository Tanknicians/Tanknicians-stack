import InvertColorsOutlinedIcon from '@mui/icons-material/InvertColorsOutlined';
import LoadingProgressButton from '../components/LoadingProgressButton';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useLoginMutation } from '../redux/slices/auth/authApiSlice';
import loginRandomImages from '../components/LoginPageRandomImage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setCredentials } from '../redux/slices/auth/authSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { zodResolver } from '@hookform/resolvers/zod';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import * as z from 'zod';
import { authLogin } from '../zodTypes';

interface LoginFormData {
  email: string;
  password: string;
}

// Form validation
const schema = authLogin;
function Copyright(props: { [k: string]: unknown }) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      <Link
        color='inherit'
        href='https://tanknicians-web-q4jam.ondigitalocean.app/'
        target='_blank'
      >
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
const randomImage = require(`../assets/images/${randomImagePath}`);

export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  // Hooks for API and Routing
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Error message for login attempt
  const errorColor = '#d32f2f';
  const [loginError, setLoginError] = useState({
    errorMessage: '',
    isLoginError: false
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { control, register, handleSubmit, formState } = useForm<LoginFormData>({resolver: zodResolver(schema)});

  // error checks for form submission
  // add above to useForm<LoginFormData> to use
  // const { errors } = formState;

  // Form submission with error checks
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const loginData = data;

    try {
      const userData = await login(loginData).unwrap();
      dispatch(setCredentials({ ...userData, loginData }));

      navigate('/dashboard/Approve Forms');
    } catch (unparsdError) {
      const errorSchema = z.object({
        status: z.coerce.number().optional(),
        data: z.object({ message: z.string().default('') })
      });
      const err = errorSchema.parse(unparsdError);
      if (!err?.status) {
        // isLoading: true until timeout occurs
        setLoginError({
          errorMessage: 'No Server Response',
          isLoginError: true
        });
      } else if (err?.status === 400) {
        setLoginError({ errorMessage: err.data?.message, isLoginError: true });
      } else if (err?.status === 401) {
        setLoginError({ errorMessage: err.data?.message, isLoginError: true });
      } else {
        setLoginError({ errorMessage: err.data?.message, isLoginError: true });
      }
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
            backgroundColor: (t) =>
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
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                id='email'
                label='Email Address'
                margin='normal'
                {...register('email')}
                fullWidth
                autoFocus
                autoComplete='email'
                required={loginError.isLoginError}
                error={loginError.isLoginError}
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.preventDefault();
                  }
                }}
              />
              <TextField
                id='outlined-adornment-password'
                margin='normal'
                required={loginError.isLoginError}
                type={showPassword ? 'text' : 'password'}
                label='Password'
                {...register('password')}
                fullWidth
                autoComplete='current-password'
                error={loginError.isLoginError}
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.preventDefault();
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onMouseDown={handleClickShowPassword}
                        onMouseUp={handleClickShowPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {/* <Controller */}
              {/*   name='remember' */}
              {/*   control={control} */}
              {/*   render={({ field }) => ( */}
              {/*     <FormControlLabel */}
              {/*       control={ */}
              {/*         <Checkbox {...field} value='remember' color='primary' /> */}
              {/*       } */}
              {/*       label='Remember me' */}
              {/*     /> */}
              {/*   )} */}
              {/* /> */}
              <Typography
                align='center'
                style={{ marginTop: 4, color: errorColor }}
              >
                {loginError.errorMessage}
              </Typography>
              <LoadingProgressButton
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 2, mb: 2 }}
                isLoading={isLoading}
              >
                Sign In
              </LoadingProgressButton>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            component='footer'
            sx={{
              py: 3,
              px: 2
            }}
          >
            <Container maxWidth='sm'>
              <Copyright />
            </Container>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
