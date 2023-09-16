import { UserOption } from '../Redux/slices/users/userManagementSlice';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import React from 'react';

type OptionsList = {
  optionsList: UserOption[];
  handleUserSelected: (
    _event: React.SyntheticEvent,
    value: UserOption | null
  ) => void;
};

const styles = {
  groupLabelContainer: {
    backgroundColor: '#081627',
    width: '100%'
  },
  groupLabel: {
    fontWeight: 'bold',
    width: '100%',
    display: 'flex',
    paddingLeft: 10,
    color: 'white'
  },
  optionLabel: {
    backgroundColor: 'white',
    width: '100%',
    display: 'flex',
    paddingLeft: 10
  },
  customerNameandGroupLabel: {
    width: '50%'
  }
};

export default function UserSearchBar({
  optionsList,
  handleUserSelected
}: OptionsList) {
  if (!optionsList) return <div>Loading...</div>;
  return (
    <Autocomplete
      id='grouped-users-tanks'
      onChange={handleUserSelected}
      options={optionsList
        .slice()
        .sort((a, b) => a.firstName.localeCompare(b.firstName))}
      groupBy={(option) => option.firstName.charAt(0).toUpperCase()}
      getOptionLabel={(option) =>
        `${option.firstName} ${option.middleName} ${option.lastName} ${option.address}`
      }
      sx={{ width: '50%' }}
      renderInput={(params) => (
        <TextField autoFocus {...params} label='Search User' />
      )}
      renderGroup={(params) => (
        <div {...params} style={styles.groupLabelContainer}>
          <div style={styles.groupLabel}>
            <span style={styles.customerNameandGroupLabel}>{params.group}</span>
            <span>Address</span>
          </div>
          {params.children}
        </div>
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.firstName, inputValue, {
          insideWords: true
        });
        const parts = parse(option.firstName, matches);

        return (
          <li {...props} style={styles.optionLabel}>
            <span
              id='customer-fullname'
              style={styles.customerNameandGroupLabel}
            >
              {parts.map((part, index) => (
                <span
                  key={`e-${index}`}
                  style={{
                    fontWeight: part.highlight ? 700 : 400
                  }}
                >
                  {part.text}
                </span>
              ))}
              <span>{` ${option.middleName} ${option.lastName}`}</span>
            </span>
            <span id='customer-address'>{option.address}</span>
          </li>
        );
      }}
    />
  );
}
