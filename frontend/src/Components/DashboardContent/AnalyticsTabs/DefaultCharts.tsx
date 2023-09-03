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
import { idText } from 'typescript';

export default function DefaultChartsTab() {
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [listToggle, setListToggle] = useState(true);
  const { data, error, isLoading } = useGetClientsQuery(true);

  const handleListToggle = () => {
    setListToggle(!listToggle);
  };

  interface OwnedTanks {
    id: number;
  }
  interface UserData {
    OwnedTanks: OwnedTanks[];
    firstName: string;
    lastName: string;
    id: number;
  }

  let myUserData: UserData[] | null = null;

  useEffect(() => {
    async function fetchData() {
      try {
      } catch (error) {
        myUserData = data;
      } finally {
      }
    }
    fetchData();
  }, [data, error, isLoading]);

  const toggleSubMenu = (itemId: number) => {
    if (openItemId === itemId) {
      setOpenItemId(null);
    } else {
      setOpenItemId(itemId);
    }
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
          {myUserData.map(({ id, firstName, lastName, OwnedTanks }) => (
            <div>
              <ListItemButton onClick={() => toggleSubMenu(id)} key={id}>
                <ListItemText primary={id} />
                {id === openItemId ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={id === openItemId} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {OwnedTanks.map(({ id }) => (
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => handleRequestChart(id)}
                      key={id}
                    >
                      <ListItemText primary={id} />
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
