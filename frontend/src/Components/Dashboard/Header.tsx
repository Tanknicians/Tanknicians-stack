import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import * as React from 'react';
import { Box } from '@mui/material';
import { useLocation } from "react-router-dom";

interface HeaderProps {
  selection:string;
}

export default function Header(props:HeaderProps) {
  const {selection} = props
  console.log("Header says ", selection)

  return (
    <React.Fragment>
      <AppBar
        component='div'
        color='primary'
        position='sticky'
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems='center' spacing={1}>
            <Grid item xs>
              <Typography color='inherit' variant='h5' component='h1'>
                {selection}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
