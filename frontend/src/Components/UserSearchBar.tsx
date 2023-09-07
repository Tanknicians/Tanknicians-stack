import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React from 'react';

type OptionsList = {
  optionsList: UserOption[];
};

type UserOption = {
  user: string;
  address: string;
  phone: string;
};

export default function UserSearchBar({ optionsList }: OptionsList) {
  return (
    <Autocomplete
      id='grouped-demo'
      options={optionsList.sort((a, b) => -b.user[0].localeCompare(a.user[0]))}
      groupBy={option => option.user[0]}
      getOptionLabel={option => option.user}
      sx={{ width: 300 }}
      renderInput={params => <TextField {...params} label='With categories' />}
    />
  );
}
