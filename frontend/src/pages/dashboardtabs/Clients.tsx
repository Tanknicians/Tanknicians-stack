import {
  UserOption,
  useGetClientsQuery
} from '../../redux/slices/users/userManagementSlice';
import CreateTankForm from '../../components/CreateTankForm';
import UserSearchBar from '../../components/UserSearchBar';
import { Button } from '@mui/material';
import { useState } from 'react';
import CreateUserModal from '../../components/CreateUser';

export default function Clients() {
  const userId = 1;
  const { data: optionsList, error } = useGetClientsQuery(true);
  console.log('OptionsList: ', optionsList);
  console.log('OptionsList error: ', error);
  const [currentUser, selectCurrentUser] = useState<UserOption | null>(null);
  const [tankModalOpen, setTankModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

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

  const handleOpenUserModal = () => {
    setUserModalOpen((prevState) => !prevState);
  };

  const handleOpenTankModal = () => {
    setTankModalOpen((prevState) => !prevState);
  };

  return (
    <>
      <Button variant='contained' onClick={handleOpenTankModal}>
        Add Tank
      </Button>
      <Button variant='contained' onClick={handleOpenUserModal}>
        Add User
      </Button>

      <CreateUserModal open={userModalOpen} setOpen={handleOpenUserModal} />
      <CreateTankForm
        userId={userId}
        open={tankModalOpen}
        setOpen={setTankModalOpen}
      />
      <UserSearchBar
        optionsList={optionsList}
        handleUserSelected={handleUserSelected}
      />
    </>
  );
}
