import { Alert, Button, LinearProgress, TextField } from '@mui/material';
import { trpc } from '../API/trpcClient';
import { useState } from 'react';

export default function PasswordResetPage() {
  // const navigate = useNavigate();
  const useResetPassword = trpc.email.resetPassword.useMutation();
  const [email, setEmail] = useState('');

  function resetPassword() {
    useResetPassword.mutate({
      email
    });
  }
  return (
    <>
      {useResetPassword.isSuccess && (
        <Alert severity='info'>Link to reset password has been sent</Alert>
      )}
      {useResetPassword.isError && (
        <Alert severity='error'>
          An error occurred while sending the email
        </Alert>
      )}
      <TextField value={email} onChange={e => setEmail(e.target.value)} />
      <Button onClick={resetPassword}>Send email</Button>
      {useResetPassword.isLoading && <LinearProgress />}
    </>
  );
}
