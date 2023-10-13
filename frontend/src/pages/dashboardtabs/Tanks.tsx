import {
  UserData,
  useGetClientsQuery
} from '../../redux/slices/users/userManagementSlice';
import CreateTankForm from '../../components/forms/CreateTank';
import UserSearchBar from '../../components/UserSearchBar';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { useEffect, useMemo, useState } from 'react';

import CreateServiceCallModal from '../../components/forms/UpsertServiceCall';
import { UpdateTankMetaData } from '../../zodTypes';
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
  Card
} from '@mui/material';
import SCDataGrid from '../../components/SCDataGrid';
import TankGrid from '../../components/datagrid/TankGrid';
import { useLocation, useNavigate } from 'react-router-dom';

export function TankTabs({
  tanks,
  employeeId,
  selectedTankId,
  setSelectedTankId
}: {
  tanks: UpdateTankMetaData[];
  employeeId: number;
  selectedTankId: number | null;
  setSelectedTankId(tankId: number | null): void;
}) {
  const selectedTank = useMemo(
    () => tanks.find((tank) => tank.id === selectedTankId) ?? null,
    [selectedTankId, tanks]
  );

  const [createTankOpen, setCreateTankOpen] = useState(false);
  const [createServiceCallOpen, setCreateServiceCallOpen] = useState(false);

  const handleTankSelection = (event: SelectChangeEvent) => {
    const selectedTank = tanks.find(
      ({ id }) => id === parseInt(event.target.value)
    );
    setSelectedTankId(selectedTank?.id ?? null);
  };
  const handleAddTank = () => {
    setCreateTankOpen(true);
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
            <Typography variant='h6'>This user has no tanks.</Typography>
            <Button
              sx={{ maxHeight: 40, marginBottom: 1 }}
              variant='outlined'
              onClick={handleAddTank}
            >
              Add Tank
            </Button>
          </Card>
        </Container>
      )}
      {selectedTank && (
        <>
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between'
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
                    return selectedTank.description ?? selectedTank.id;
                  }}
                  onChange={handleTankSelection}
                  label='Tanks'
                  sx={{ textAlign: 'center' }}
                >
                  {tanks.map((tank) => {
                    return (
                      <MenuItem value={tank.id}>
                        {tank.description ?? tank.id}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Button
                sx={{ maxHeight: 40, marginBottom: 1 }}
                variant='outlined'
                onClick={handleAddTank}
              >
                Add Tank
              </Button>
            </Box>
          </Box>
          <Paper elevation={3}>
            <Container>
              <Typography variant='h6'>Service Calls</Typography>
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
        user.OwnedTanks?.some((tank) => tank.id === selectedTankId)
      )?.id ?? null;
    if (userId) {
      selectCurrentUserId(userId);
      console.log({ userId });
    } else {
      console.log('missing', { selectedTankId });
      navigate('/Dashboard/tanks');
    }
  }, [selectedUserId, selectedTankId, optionsList]);

  const collapse = !!selectedUser;

  const handleUserSelected = (
    _event: React.SyntheticEvent,
    customer: UserData | null
  ) => {
    selectCurrentUserId(customer?.id ?? null);
  };

  if (!optionsList) return <div>Loading...</div>;

  return (
    <Container>
      <Grid container rowSpacing={1} alignItems='center' maxWidth={'100%'}>
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
              <TankGrid hideToolbar selectTankId={selectCurrentUserId} />
            </Paper>
          </Collapse>
        </Grid>
      </Grid>
    </Container>
  );
}
