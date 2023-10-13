import { UserData } from '../redux/slices/users/userManagementSlice';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import React from 'react';

type UserList = {
  userList: UserData[];
  selectedUser: UserData | null;
  handleUserSelected: (
    _event: React.SyntheticEvent,
    value: UserData | null,
  ) => void;
  label: string;
};

const styles = {
  groupLabelContainer: {
    width: '100%',
  },
  groupLabel: {
    fontWeight: 'bold',
    width: '100%',
    display: 'flex',
    paddingLeft: 10,
    color: 'black',
    borderBottom: '1px solid #343a40',
    background: '#adb5bd',
  },
  optionLabel: {
    backgroundColor: '#f8f9fa',
    width: '100%',
    display: 'flex',
    paddingLeft: 10,
  },
  customerNameandGroupLabel: {
    width: '50%',
  },
};

function getUsersName(user: UserData) {
  return user?.firstName ?? user?.lastName ?? user?.middleName ?? '';
}

export default function UserSearchBar({
  userList,
  handleUserSelected,
  selectedUser,
  label,
}: UserList) {
  return (
    <Autocomplete
      id='grouped-users-tanks'
      onChange={handleUserSelected}
      value={selectedUser}
      options={userList
        .slice()
        .sort((userA, userB) =>
          getUsersName(userA).localeCompare(getUsersName(userB)),
        )}
      groupBy={(user) => getUsersName(user).charAt(0).toUpperCase()}
      getOptionLabel={(option) =>
        `${option.firstName} ${option.middleName} ${option.lastName}`
      }
      sx={{ width: '100%', backgroundColor: 'white', borderRadius: '10px' }}
      renderInput={(params) => (
        <TextField autoFocus {...params} label={`Search ${label}`} />
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
        const matches = match(option.firstName ?? '', inputValue, {
          insideWords: true,
        });
        const parts = parse(option.firstName ?? '', matches);

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
                    fontWeight: part.highlight ? 700 : 400,
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
