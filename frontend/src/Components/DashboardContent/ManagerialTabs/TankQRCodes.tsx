import React from 'react';
import UserSearchBar from '../../UserSearchBar';
import { useUserWithTanksQuery } from '../../../Redux/slices/user/userTanksApiSlice';

export default function TankQRCodes() {
  const { data: optionsList, isLoading } = useUserWithTanksQuery(true);

  console.log('optionsList: ', optionsList);

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <h1>Loaded!</h1>
        // <UserSearchBar optionsList={optionsList} />
      )}
    </div>
  );
}
