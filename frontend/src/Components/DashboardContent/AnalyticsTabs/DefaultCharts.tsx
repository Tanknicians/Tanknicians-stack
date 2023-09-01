import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useGetClientsQuery } from '../../../Redux/slices/users/userManagementSlice';
import { useEffect } from 'react';

export default function DefaultChartsTab() {
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const { data, error, isLoading } = useGetClientsQuery(true);

  console.log('My Data: ' + data);

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         console.log("My Data: "+data);
  //       } catch (error) {
  //         console.error(error);
  //       } finally {
  //       }
  //     }
  //     fetchData();
  //   }, [data, error, isLoading]);

  const toggleSubMenu = (itemId: string) => {
    if (openItemId === itemId) {
      setOpenItemId(null);
    } else {
      setOpenItemId(itemId);
    }
  };

  interface ClientData {
    name: string;
    address: string;
    phone: number;
    tanksIDs: number[];
  }

  const clientDataObj: ClientData[] = [
    {
      name: 'Doe, John',
      address: '',
      phone: 1231231234,
      tanksIDs: [1, 2, 3, 4]
    },
    {
      name: 'Mitchell, Will',
      address: '',
      phone: 1231231234,
      tanksIDs: [5]
    },
    {
      name: 'Martinez, Carlos',
      address: '',
      phone: 1231231234,
      tanksIDs: [6, 7]
    },
    {
      name: 'Hocker, Harry',
      address: '',
      phone: 1231231234,
      tanksIDs: [8]
    },
    {
      name: 'Thomar, Harmeyer',
      address: '',
      phone: 1231231234,
      tanksIDs: [9, 10, 11, 12, 13]
    }
  ];

  const [listToggle, setListToggle] = useState(true);

  const handleListToggle = () => {
    setListToggle(!listToggle);
  };

  const handleRequestChart = (tankID: number) => {
    console.log('TankID: ' + tankID);
    // make api call for data

    // let data = apiCall();
    // data = formatChartdata(data);
    // setFormattedData(data);
    setListToggle(false);
  };

  return (
    <div>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            Clients{' '}
            <IconButton onClick={handleListToggle}>
              <MenuIcon />
            </IconButton>
          </ListSubheader>
        }
      >
        <Collapse in={listToggle}>
          {clientDataObj.map(({ name, tanksIDs }, key) => (
            <div>
              <ListItemButton onClick={() => toggleSubMenu(name)} key={name}>
                <ListItemText primary={name} />
                {name === openItemId ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={name === openItemId} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {tanksIDs.map(tankID => (
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => handleRequestChart(tankID)}
                      key={tankID}
                    >
                      <ListItemText primary={tankID} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </Collapse>
      </List>
    </div>
  );
}
