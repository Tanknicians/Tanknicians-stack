// import ListSubheader from '@mui/material/ListSubheader';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import Collapse from '@mui/material/Collapse';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import { useState } from 'react';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useGetClientsQuery } from '../../redux/slices/users/userManagementSlice';
// import { useGetTankDataQuery } from '../../redux/slices/tanks/tankDataSlice';
// import LineChart from '../chartjs/LineChart';
// import { TankData } from './DUMMYDATA';

// interface OwnedTanks {
//   id: number;
// }
// export interface UserData {
//   OwnedTanks: OwnedTanks[];
//   firstName: string;
//   lastName: string;
//   id: number;
// }

// export default function DefaultCharts() {
//   // interfaces to appease sadistict TS kink enjoyers

//   interface UseQuery {
//     data: UserData[] | null;
//     error: Error | undefined;
//     isLoading: boolean;
//   }

//   // List toggle controls
//   const [toggleShowCharts, setToggleShowCharts] = useState(false);
//   const [openItemId, setOpenItemId] = useState<number | null>(null);
//   const [listToggle, setListToggle] = useState(true);
//   const { data, error, isLoading } = useGetClientsQuery<UseQuery>(true);
//   console.log(data, error, isLoading);
//   // const { data, error, isLoading } = useGetTankDataQuery<UseQuery>(tankID);

//   // Temporary hack to get users and their tanks from DB
//   let myUserData: UserData[] | null = null;
//   myUserData = data;

//   // List menu/submenu toggle handlers
//   const handleListToggle = () => {
//     setListToggle(!listToggle);
//   };

//   const toggleSubMenu = (itemId: number) => {
//     if (openItemId === itemId) {
//       setOpenItemId(null);
//     } else {
//       setOpenItemId(itemId);
//     }
//   };

//   // on selection of users tankID, generate charts
//   const handleRequestChart = (tankID: number) => {
//     console.log(`TankID:·${tankID}`);
//     setListToggle(false);
//     setToggleShowCharts(true);
//   };

//   if (myUserData != null) {
//     return (
//       <div>
//         <List
//           sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
//           component='nav'
//           aria-labelledby='nested-list-subheader'
//           subheader={
//             <ListSubheader component='div' id='nested-list-subheader'>
//               Clients{' '}
//               <IconButton onClick={handleListToggle}>
//                 <MenuIcon />
//               </IconButton>
//             </ListSubheader>
//           }
//         >
//           <Collapse in={listToggle}>
//             {myUserData?.map(({ id, firstName, lastName, OwnedTanks }) => (
//               <div>
//                 <ListItemButton onClick={() => toggleSubMenu(id)} key={id}>
//                   <ListItemText primary={`${firstName}·${lastName}`} />
//                   {id === openItemId ? <ExpandLess /> : <ExpandMore />}
//                 </ListItemButton>

//                 <Collapse in={id === openItemId} timeout='auto' unmountOnExit>
//                   <List component='div' disablePadding>
//                     {OwnedTanks.map(({ id }) => (
//                       <ListItemButton
//                         sx={{ pl: 4 }}
//                         onClick={() => handleRequestChart(id)}
//                         key={id}
//                       >
//                         <ListItemText primary={`Select·Tank·${id}`} />
//                       </ListItemButton>
//                     ))}
//                   </List>
//                 </Collapse>
//               </div>
//             ))}
//           </Collapse>
//         </List>
//         <h2>One Chart Demo</h2>
//         <div
//           style={{ alignContent: 'center', width: '50%', position: 'relative' }}
//         >
//           {toggleShowCharts &&
//             TankData.map((d) => (
//               <div>
//                 <h3>{d.datasets[0].label}</h3>
//                 <Card
//                   variant='outlined'
//                   sx={{ maxWidth: '80%', minWidth: '50%' }}
//                 >
//                   <CardContent>
//                     <LineChart data={d} />
//                   </CardContent>
//                 </Card>
//               </div>
//             ))}
//         </div>
//       </div>
//     );
//   } else {
//     return <div>error</div>;
//   }
// }
