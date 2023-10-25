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
import { tankSchema, UpdateTankMetaData } from '../zodTypes';
import { useMemo, useState } from 'react';
import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import QRCodeCard from './QRCodeCard';
import { UserData } from '../redux/slices/users/userManagementSlice';
import { ArrowCircleRight } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import UpdateTankModal from './forms/UpsertTank';

function Row(props: { row: UpdateTankMetaData; client: UserData }) {
  const { row, client } = props;
  const [isShowTankData, setIsShowTankData] = useState(false);
  const [tankId, setTankId] = useState<number | null>();
  const navigate = useNavigate();

  function gotoTank(tankId: number) {
    navigate(`/dashboard/Tanks?tankId=${tankId}`);
  }

  const handleOpenUpdateTankModal = (tank: tankSchema) => {
    setTankId(tank.id);
    handleClose();
  };

  const tank = useMemo(() => row.id === tankId, [tankId]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TableRow onClick={() => setIsShowTankData(!isShowTankData)}>
        <TableCell align='center' sx={{ flex: 1 }}>
          {row.nickname}
        </TableCell>
        <TableCell align='center' sx={{ flex: 1 }}>
          {row.volume}
        </TableCell>
        <TableCell align='center' sx={{ flex: 1 }}>
          {row.type}
        </TableCell>
        <TableCell align='center' sx={{ flex: 1 }}>
          {row.tanknicianSourcedOnly ? 'Yes' : 'No'}
        </TableCell>
        <TableCell align='center' sx={{ flex: 1 }}>
          {new Date(row.lastDateServiced).toLocaleDateString()}
        </TableCell>

        <TableCell align='center' sx={{ flex: 1 }}>
          <IconButton size='small'>
            {isShowTankData ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={12}>
          <Collapse in={isShowTankData} timeout='auto' unmountOnExit>
            <Stack
              alignItems='center'
              spacing={2}
              direction='row'
              justifyContent='space-around'
              height='100%'
            >
              <Stack
                direction='column'
                justifyContent='space-evenly'
                alignItems='center'
                spacing={2}
                width='100%'
              >
                <Typography variant='h6' gutterBottom>
                  QR Code
                </Typography>
                <QRCodeCard
                  client={client}
                  tankId={row.id}
                  qrSymbol={row.qrSymbol}
                  nickname={row.nickname}
                />
              </Stack>
              <Stack
                direction='column'
                alignItems='center'
                spacing={2}
                width='100%'
              >
                <Typography variant='h6' gutterBottom>
                  Analytics
                </Typography>
                <Button
                  variant='outlined'
                  endIcon={<ArrowCircleRight />}
                  onClick={() => gotoTank(row.id)}
                >
                  Go to tank view
                </Button>
              </Stack>
              <Stack
                direction='row'
                justifyContent='flex-end'
                alignItems='flex-start'
                height='100%'
              >
                <IconButton
                  aria-label='more'
                  id='long-button'
                  aria-controls={openMenu ? 'long-menu' : undefined}
                  aria-expanded={openMenu ? 'true' : undefined}
                  aria-haspopup='true'
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
                  <MenuItem onClick={() => handleOpenUpdateTankModal(row)}>
                    Edit
                  </MenuItem>
                </Menu>
                {!!tank && (
                  <UpdateTankModal
                    userId={client.id}
                    open={!!tank}
                    setOpen={
                      (open: boolean) =>
                        !open &&
                        setTankId(
                          null
                        ) /*FIX: This is a hack to get the modal to close*/
                    }
                    previousTank={row}
                  />
                )}
              </Stack>
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function TanksCollapsibleTable({
  client,
  tanks
}: {
  client: UserData;
  tanks: UpdateTankMetaData[];
}) {
  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table stickyHeader size='small'>
        <TableHead>
          <TableRow>
            <TableCell align='center' sx={{ flex: 1 }}>
              Nickname
            </TableCell>
            <TableCell align='center' sx={{ flex: 1 }}>
              Volume
            </TableCell>
            <TableCell align='center' sx={{ flex: 1 }}>
              Tank Type
            </TableCell>
            <TableCell align='center' sx={{ flex: 1 }}>
              Tanknicians-Sourced
            </TableCell>
            <TableCell align='center' sx={{ flex: 1 }}>
              Last Serviced
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {tanks.map((tank) => (
            <Row key={tank.id} row={tank} client={client} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
