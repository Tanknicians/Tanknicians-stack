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
import QRCodeCard from './QRCodeCard';
import { UserData } from '../redux/slices/users/userManagementSlice';

function Row(props: { row: UpdateTankMetaData }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow onClick={() => setOpen(!open)}>
        <TableCell align='center'>{row.description}</TableCell>
        <TableCell align='center'>{row.volume}</TableCell>
        <TableCell align='center'>{row.type}</TableCell>
        <TableCell align='center'>
          {row.tanknicianSourcedOnly ? 'Yes' : 'No'}
        </TableCell>
        <TableCell align='center'>
          {new Date(row.lastDateServiced).toLocaleDateString()}
        </TableCell>

        <TableCell align='center'>
          <IconButton size='small'>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={12}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Typography textAlign='center' variant='h6' gutterBottom>
              QR Code
            </Typography>
            <QRCodeCard
              client={CURRENTCLIENT}
              tankId={row.id}
              qrSymbol={row.qrSymbol}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

let CURRENTCLIENT = {} as UserData;

export default function TanksCollapsibleTable({
  client,
  tanks
}: { client: UserData; tanks: UpdateTankMetaData[] }) {
  CURRENTCLIENT = client;
  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell align='center'>Name</TableCell>
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
  );
}
