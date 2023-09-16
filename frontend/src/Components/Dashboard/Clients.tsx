import {
  UserOption,
  useGetClientsQuery
} from '../../Redux/slices/users/userManagementSlice';
import CreateTankForm from '../CreateTankForm';
import UserSearchBar from '../UserSearchBar';
import { Button } from '@mui/material';
import { useState } from 'react';

export default function Clients() {
  const userId = 1;
  const { data: optionsList, isLoading, error } = useGetClientsQuery(true);
  console.log('OptionsList: ', optionsList);
  console.log('OptionsList error: ', error);
  const [currentCustomer, selectCurrentUser] = useState<UserOption | null>(
    null
  );
  const [open, setOpen] = useState(false);

  if (!optionsList) return <div>Loading...</div>;

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
