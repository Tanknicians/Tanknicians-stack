import {
  UserData,
  useGetClientsQuery
} from '../../redux/slices/users/userManagementSlice';
import CreateTankForm from '../../components/forms/UpsertTank';
import UpdateTankForm from '../../components/forms/UpsertTank';
import UserSearchBar from '../../components/UserSearchBar';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { useEffect, useMemo, useState } from 'react';

import CreateServiceCallModal from '../../components/forms/UpsertServiceCall';
import { tankSchema } from '../../zodTypes';
import {
  Button,
  Collapse,
  Container,
  Grid,
  Typography,
  Paper,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  Box,
  Card,
  IconButton,
  Menu,
  ListItemIcon
} from '@mui/material';
import SCDataGrid from '../../components/SCDataGrid';
import TankGrid from '../../components/datagrid/TankGrid';
import { useLocation, useNavigate } from 'react-router-dom';
import { Add, Edit } from '@mui/icons-material';
import DefaultCharts from '../../components/chartjs/DefaultCharts';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export function TankTabs({
  tanks,
  employeeId,
  selectedTankId,
  setSelectedTankId
}: {
  tanks: tankSchema[];
  employeeId: number;
  selectedTankId: number | null;
  setSelectedTankId(tankId: number | null): void;
}) {
  const [tankId, setTankId] = useState<number | null>();
  const selectedTank = useMemo(
    () => tanks.find((tank) => tank.id === selectedTankId) ?? null,
    [selectedTankId, tanks]
  );

  console.log('Selected tank:', selectedTank);

  const tank = useMemo(() => selectedTank?.id === tankId ?? null, [tankId]);

  const [createTankOpen, setCreateTankOpen] = useState(false);
  const [updateTankOpen, setUpdateTankOpen] = useState(false);
  const [createServiceCallOpen, setCreateServiceCallOpen] = useState(false);
  const [showCharts, setShowCharts] = useState<boolean>(true);

  const handleChartCollapse = () => {
    setShowCharts(!showCharts);
  };

  const handleTankSelection = (event: SelectChangeEvent) => {
    const selectedTank = tanks.find(
      ({ id }) => id === parseInt(event.target.value)
    );
    setSelectedTankId(selectedTank?.id ?? null);
  };
  const handleAddTank = () => {
    setCreateTankOpen(true);
  };

  const handleUpdateTank = (tank: tankSchema) => {
    setTankId(tank.id);
    setUpdateTankOpen(true);
    handleTankMenuClose();
  };

  // Add and Edit Tank Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const tankMenuOpen = Boolean(anchorEl);
  const handleTankMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleTankMenuClose = () => {
    setAnchorEl(null);
  };

  // Switch to grid
  return (
    <>
      <CreateTankForm
        userId={employeeId}
        open={createTankOpen}
        setOpen={setCreateTankOpen}
      />

      {!selectedTank && (
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <Card
            elevation={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: 300,
              padding: 5,
              minHeight: 200,
              marginTop: 10
            }}
          >
            <Typography variant='h6' sx={{ marginBottom: 1 }}>
              Client has no tanks.
            </Typography>
            <Button
              size='small'
              variant='contained'
              onClick={handleAddTank}
              startIcon={<Add fontSize='inherit' />}
            >
              Add Tank
            </Button>
          </Card>
        </Container>
      )}
      {selectedTank && (
        <>
          {tank && (
            <UpdateTankForm
              userId={selectedTank.customerId}
              open={updateTankOpen}
              setOpen={
                (open: boolean) =>
                  !open &&
                  setTankId(
                    null
                  ) /*FIX: This is a hack to get the modal to close*/
              }
              previousTank={selectedTank}
            />
          )}
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 16'
              }}
            >
              <FormControl variant='standard' sx={{ m: 1, minWidth: 160 }}>
                <Select
                  autoWidth
                  variant='standard'
                  labelId='tank-id-selector-label'
                  id='tank-id-selector'
                  displayEmpty={true}
                  renderValue={() => {
                    return selectedTank.nickname ?? selectedTank.id;
                  }}
                  onChange={handleTankSelection}
                  label='Tanks'
                  sx={{ textAlign: 'center' }}
                >
                  {tanks.map((tank) => {
                    return (
                      <MenuItem key={tank.id} value={tank.id}>
                        {tank.nickname ?? tank.id}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Button
                variant='outlined'
                onClick={handleTankMenuOpen}
                sx={{ m: 1 }}
              >
                Tank Options
              </Button>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={tankMenuOpen}
                onClose={handleTankMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0
                    }
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleAddTank}>
                  <ListItemIcon>
                    <Add fontSize='small' />
                  </ListItemIcon>
                  Add Tank
                </MenuItem>
                <MenuItem onClick={() => handleUpdateTank(selectedTank)}>
                  <ListItemIcon>
                    <Edit fontSize='small' />
                  </ListItemIcon>
                  Edit Tank
                </MenuItem>
              </Menu>
            </Box>
            <Paper>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <IconButton size='small' onClick={handleChartCollapse}>
                  {showCharts ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </Box>
              <Collapse in={showCharts} unmountOnExit>
                <DefaultCharts tankId={selectedTank?.id} />
              </Collapse>
            </Paper>
          </Box>
          <Paper elevation={3} sx={{ marginTop: 2 }}>
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant='h5'>Service Calls</Typography>
              <Button
                variant='contained'
                onClick={() => setCreateServiceCallOpen(true)}
                startIcon={<Add fontSize='inherit' />}
                sx={{ margin: '8 0' }}
              >
                Add Service Form
              </Button>
            </Container>
            <SCDataGrid tank={selectedTank} employeeId={undefined} />
          </Paper>
          <CreateServiceCallModal
            key={selectedTank.id}
            open={createServiceCallOpen}
            setOpen={setCreateServiceCallOpen}
            tankId={selectedTank.id}
            employeeId={employeeId}
          />
        </>
      )}
    </>
  );
}

export default function Tanks() {
  const { data: optionsList } = useGetClientsQuery({
    includeTanks: true,
    isEmployee: false
  });
  const location = useLocation();
  const urlTankId = useMemo(
    () => new URLSearchParams(location.search).get('tankId'),
    [location]
  );
  const [selectedTankId, setSelectedTankId] = useState<number | null>(
    Number(urlTankId) ?? null
  );
  const [selectedUserId, selectCurrentUserId] = useState<number | null>(null);
  const selectedUser = useMemo(
    () => optionsList?.find((user) => user.id === selectedUserId) ?? null,
    [optionsList, selectedUserId]
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedTankId || selectedUserId || !optionsList) {
      return;
    }
    const userId =
      optionsList.find((user) =>
        user.OwnedTanks?.some((tank: tankSchema) => tank.id === selectedTankId)
      )?.id ?? null;
    if (userId) {
      selectCurrentUserId(userId);
    } else {
      navigate('/Dashboard/tanks');
    }
  }, [selectedUserId, selectedTankId, optionsList]);

  useEffect(() => {
    const isSelectedUserAndNoSelectedTank = selectedUser && !selectedTankId;
    if (isSelectedUserAndNoSelectedTank) {
      setSelectedTankId(selectedUser.OwnedTanks?.[0]?.id ?? null);
    }
  }, [selectedUser, selectedTankId]);

  const collapse = !!selectedUser;

  const handleUserSelected = (
    _event: React.SyntheticEvent,
    customer: UserData | null
  ) => {
    selectCurrentUserId(customer?.id ?? null);
    setSelectedTankId(null);
    if (!customer?.id) {
      navigate('/dashboard/Tanks');
    }
  };

  if (!optionsList) return <div>Loading...</div>;

  return (
    <Container>
      <Grid
        container
        rowSpacing={1}
        alignItems='center'
        maxWidth={'800px'}
        margin={'auto'}
      >
        <Grid item xs={12} md={3}>
          <Typography variant='h4' component='h1'>
            Tanks
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <UserSearchBar
            userList={optionsList}
            selectedUser={selectedUser}
            handleUserSelected={handleUserSelected}
            label='Clients'
          />
        </Grid>
        <Grid item xs={12} md={3} />
        <Grid item xs={12}>
          <Collapse in={collapse}>
            {selectedUser?.OwnedTanks && (
              <TankTabs
                key={selectedUser.id}
                tanks={selectedUser.OwnedTanks}
                employeeId={selectedUser.id}
                selectedTankId={selectedTankId}
                setSelectedTankId={setSelectedTankId}
              />
            )}
          </Collapse>
          <Collapse in={!collapse}>
            <Paper elevation={3}>
              <TankGrid
                hideToolbar
                selectUserId={selectCurrentUserId}
                selectTankId={setSelectedTankId}
              />
            </Paper>
          </Collapse>
        </Grid>
      </Grid>
    </Container>
  );
}
