// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Tooltip from '@mui/material/Tooltip';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
// import RefreshIcon from '@mui/icons-material/Refresh';
import Managerial from "./DashboardContent/Managerial";
import Database from "./DashboardContent/DataBaseView";
import Analytics from "./DashboardContent/Analytics";
import { Route, Routes } from "react-router-dom"
import DashboardAppBar from "./DashboardAppBar";

interface ContentProps{
  handleDrawerToggle: () => void
}

export default function Content( props: ContentProps) {
  const {handleDrawerToggle, ... other} = props
  
  return(
    <div className="content-wrapper">
      <DashboardAppBar onDrawerToggle= {handleDrawerToggle}/>
      <Routes>
        <Route path="/Managerial" element={< Managerial handleDrawerToggle = { handleDrawerToggle }/>} />
        <Route path="/Database" element={< Database handleDrawerToggle = { handleDrawerToggle }/>} />
        <Route path="/Analytics" element={< Analytics handleDrawerToggle = { handleDrawerToggle }/>} />
      </Routes>
    </div>
    

  );


  // return (
  //   <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
  //     <AppBar
  //       position="static"
  //       color="default"
  //       elevation={0}
  //       sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
  //     >
  //       <Toolbar>
  //         <Grid container spacing={2} alignItems="center">
  //           <Grid item>
  //             <SearchIcon color="inherit" sx={{ display: 'block' }} />
  //           </Grid>
  //           <Grid item xs>
  //             <TextField
  //               fullWidth
  //               placeholder="Search by email address, phone number, or user UID"
  //               InputProps={{
  //                 disableUnderline: true,
  //                 sx: { fontSize: 'default' },
  //               }}
  //               variant="standard"
  //             />
  //           </Grid>
  //           <Grid item>
  //             <Button variant="contained" sx={{ mr: 1 }}>
  //               Add user
  //             </Button>
  //             <Tooltip title="Reload">
  //               <IconButton>
  //                 <RefreshIcon color="inherit" sx={{ display: 'block' }} />
  //               </IconButton>
  //             </Tooltip>
  //           </Grid>
  //         </Grid>
  //       </Toolbar>
  //     </AppBar>
  //     <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
  //       No users for this project yet
  //     </Typography>
  //   </Paper>
  // );
}