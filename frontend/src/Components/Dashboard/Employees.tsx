import { Button } from '@mui/material';
import { useState } from 'react';
import CreateUserModal from '../CreateUser';
import CreateServiceCallModal from '../forms/CreateServiceCall';

export default function Employees() {
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Create User</Button>
      <CreateUserModal open={createUserOpen} setOpen={setCreateUserOpen} />
      <CreateServiceCallModal open={open} setOpen={setOpen} />
    </>
  );
}
