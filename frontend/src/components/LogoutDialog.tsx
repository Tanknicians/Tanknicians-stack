import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@mui/material';
import { forwardRef } from 'react';

import { TransitionProps } from '@mui/material/transitions';
import { logout } from '../redux/slices/auth/authSlice';
import { useDispatch } from 'react-redux';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function LogoutDialog({
  open,
  setOpen
}: { open: boolean; setOpen: Function }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-logout-slide-description'
      maxWidth='xs'
      fullWidth
    >
      <DialogTitle>{'Logout'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-logout-slide-description'>
          Are You Sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant='contained' onClick={handleLogout}>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}
