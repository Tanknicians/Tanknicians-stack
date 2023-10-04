import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { UpdateTankMetaData } from '../zodTypes';
import { useState } from 'react';
import { Grid, Typography } from '@mui/material';

function Row(props: { row: UpdateTankMetaData }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow onClick={() => setOpen(!open)}>
        <TableCell sx={{ width: '22%' }} align='center'>
          {row.volume}
        </TableCell>
        <TableCell sx={{ width: '22%' }} align='center'>
          {row.type}
        </TableCell>
        <TableCell sx={{ width: '22%' }} align='center'>
          {row.tanknicianSourcedOnly ? 'Yes' : 'No'}
        </TableCell>
        <TableCell sx={{ width: '22%' }} align='center'>
          {new Date(row.lastDateServiced).toLocaleDateString()}
        </TableCell>
        <TableCell sx={{ width: '12%' }} align='center'>
          <IconButton size='small'>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={12}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ padding: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6}>
                  <Typography variant='h6' gutterBottom>
                    Description
                  </Typography>
                  {row.description ? (
                    <Typography variant='body1' gutterBottom>
                      {row.description}
                    </Typography>
                  ) : (
                    <Typography
                      variant='body1'
                      gutterBottom
                      component='div'
                      fontStyle='italic'
                    >
                      No description
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant='h6' gutterBottom>
                    QR Code
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function TanksCollapsibleTable({
  tanks
}: { tanks: UpdateTankMetaData[] }) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
      <Table size='small' stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Volume</TableCell>
            <TableCell align='center'>Tank Type</TableCell>
            <TableCell align='center'>Tanknicians' Sourced</TableCell>
            <TableCell align='center'>Last Serviced</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {tanks.map((tank) => (
            <Row key={tank.id} row={tank} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
