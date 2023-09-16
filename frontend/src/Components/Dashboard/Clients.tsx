import { Button } from '@mui/material';
import CreateTankForm from '../CreateTankForm';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../Redux/slices/auth/authSlice';
import UserSearchBar, { UserOption } from '../UserSearchBar';
import { useGetClientsQuery } from '../../Redux/slices/users/userManagementSlice';

export default function Clients() {
  // const userId = useSelector(selectCurrentUser);
  const userId = 1;
  const { data: optionsList, isLoading, error } = useGetClientsQuery(true);
  console.log('OptionsList error: ', error);
  const [currentCustomer, selectCurrentUser] = useState<UserOption | null>(
    null
  );

  // if (error) return <div>{error.message}</div>;
  // if (isLoading) return <div>Loading...</div>;

  console.log('optionsList: ', optionsList);

  const handleUserSelected = (
    _event: React.SyntheticEvent,
    customer: UserOption | null
  ) => {
    selectCurrentUser(customer);
    console.log('customer: ', customer);
  };

  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Add Tank
      </Button>
      <CreateTankForm userId={userId} open={open} setOpen={setOpen} />
      <UserSearchBar
        optionsList={optionsList}
        handleUserSelected={handleUserSelected}
      />
    </>
  );
}
