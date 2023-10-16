import {
  IconButton,
  Box,
  CircularProgress,
  Button,
  Container,
  Card,
  Typography,
  Stack
} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import {
  GridRenderCellParams,
  GridColDef,
  GridRowsProp,
  DataGrid
} from '@mui/x-data-grid';
import { useState } from 'react';
import {
  useGetAllServiceCallsQuery,
  useGetServiceCallByTankIdQuery
} from '../redux/slices/forms/servicecallApiSlice';
import { UpdateTankMetaData, ServiceCall } from '../zodTypes';
import CreateServiceCallModal from './forms/UpsertServiceCall';
import { Add, Edit as EditIcon } from '@mui/icons-material';
import { useGetClientsQuery } from '../redux/slices/users/userManagementSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/slices/auth/authSlice';

export default function SCDataGrid({
  employeeId,
  tank
}: {
  employeeId: number | undefined;
  tank: UpdateTankMetaData | undefined;
}) {
  // STATIC
  //
  //

  const navigate = useNavigate();

  const [editServiceCallId, setEditServiceCallId] = useState<
    number | undefined
  >();

  const { data: clients, isLoading: isLoadingClients } = useGetClientsQuery({
    includeTanks: true,
    isEmployee: undefined
  });

  const editButton = (params: GridRenderCellParams) => {
    return (
      <>
        <CreateServiceCallModal
          setOpen={(_) => setEditServiceCallId(undefined)}
          open={editServiceCallId === params.row.id}
          tankId={params.row.tankId}
          employeeId={params.row.employeeId}
          previousServiceCall={params.row}
        />
        <IconButton
          onClick={() => setEditServiceCallId(params.row.id)}
          size='small'
        >
          <EditIcon fontSize='inherit' />
        </IconButton>
      </>
    );
  };

  function getEmployeeName(empId: number) {
    // get the name of the technician associated with the passed employee id
    let ret = 'EMPLOYEE NAME NOT FOUND';
    try {
      const matchedUserOption = clients?.find(
        (element) => element.id === empId
      );
      if (matchedUserOption === undefined) {
      } else {
        ret = `${matchedUserOption.firstName} ${matchedUserOption.lastName}`;
      }
    } catch (e) {
      console.log(e);
    }
    return ret;
  }

  function getClientName(tankId: number): string {
    const r = 'MISSING';
    if (!clients) return r;
    for (let i = 0; i < clients?.length; i++) {
      const client = clients[i];
      if (!client.OwnedTanks) continue;
      for (let j = 0; j < client.OwnedTanks.length; j++) {
        if (client.OwnedTanks[j].id === tankId) {
          return `${client.firstName} ${client.lastName}`;
        }
      }
    }
    return r;
  }

  let rows: GridRowsProp;
  let columns: GridColDef[];

  // EMPLOYEES
  //
  //
  if (employeeId) {
    const {
      data: allServiceCalls,
      isLoading: isLoadingServiceCalls,
      error: scError
    } = useGetAllServiceCallsQuery({
      isApproved: undefined
    });

    if (isLoadingServiceCalls) {
      return <CircularProgress />;
    }
    if (!allServiceCalls) {
      return <div>Not loading service calls</div>;
    }
    const serviceCallsForEmployee: ServiceCall[] = allServiceCalls?.filter(
      (o) => o.employeeId === employeeId
    );

    const goToTankButton = (params: GridRenderCellParams) => {
      return (
        <Button
          size='small'
          variant='contained'
          onClick={() => {
            navigate(`/dashboard/Tanks?tankId=${params.row.tankId}`);
          }}
        >
          <ShowChartIcon />
        </Button>
      );
    };

    columns = [
      {
        field: 'id',
        headerName: 'ID',
        minWidth: 110,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'tankId',
        headerName: 'Tank ID',
        minWidth: 110,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'clientName',
        headerName: 'Client Name',
        minWidth: 150,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'date',
        headerName: 'Date',
        minWidth: 110,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'edit',
        headerName: 'Edit',
        minWidth: 110,
        sortable: false,
        renderCell: editButton,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'alkalinity',
        headerName: 'Alkalinity',
        minWidth: 90,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'calcium',
        headerName: 'Calcium',
        minWidth: 90,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'nitrate',
        headerName: 'Nitrate',
        minWidth: 90,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'phosphate',
        headerName: 'Phosphate',
        minWidth: 90,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'customerNotes',
        headerName: 'Customer Notes',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'employeeNotes',
        headerName: 'Employee Notes',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'unapprovedNotes',
        headerName: 'Unapproved Notes',
        minWidth: 140,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'ATOOperational',
        headerName: 'ATO Operational',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'ATOReservoirFilled',
        headerName: 'ATO Reservoir Filled',
        minWidth: 150,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'chemFilterAdjusted',
        headerName: 'Chem Filter Adjusted',
        minWidth: 150,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'doserAdjustementOrManualDosing',
        headerName: 'Dose-adjusted',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'dosingReservoirsFull',
        headerName: 'Dosing Reservoirs Full',
        minWidth: 170,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'floorsCheckedForSpillsOrDirt',
        headerName: 'Floors Checked',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'glassCleanedInside',
        headerName: 'Glass Cleaned Inside',
        minWidth: 170,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'glassCleanedOutside',
        headerName: 'Glass Cleaned Outside',
        minWidth: 170,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'mechFilterChanged',
        headerName: 'Mech Filter Changed',
        minWidth: 150,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'pumpsClearedOfDebris',
        headerName: 'Pumps Cleared',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'saltCreepCleaned',
        headerName: 'Salt Creep Cleaned',
        minWidth: 150,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'skimmerCleanedAndOperational',
        headerName: 'Skimmer Cleaned',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'waterChanged',
        headerName: 'Water Changed',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'pestAPresent',
        headerName: 'Pest A Present',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'pestBPresent',
        headerName: 'Pest B Present',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'pestCPresent',
        headerName: 'Pest C Present',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'pestDPresent',
        headerName: 'Pest D Present',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'linkToTank',
        headerName: 'Link To Tank',
        minWidth: 110,
        align: 'center',
        headerAlign: 'center',
        renderCell: goToTankButton
      }
    ];

    rows = serviceCallsForEmployee.map((s: ServiceCall) => {
      return {
        ...s,
        clientName: getClientName(s.tankId),
        date: new Date(s.createdOn).toLocaleDateString(),
        customerNotes: s.customerRequest,
        employeeNotes: s.employeeNotes,
        unapprovedNotes: s.notApprovedNotes
      };
    });
  }

  // TANKS
  //
  //
  else if (tank) {
    const { data: serviceCallsForTankID } = useGetServiceCallByTankIdQuery({
      tankId: tank.id
    });

    if (serviceCallsForTankID?.length === 0 || !serviceCallsForTankID)
      return (
        <Stack alignItems='center' justifyContent='center' height='100%'>
          <Card
            elevation={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: 300,
              padding: 5,
              minHeight: 200
            }}
          >
            <Typography variant='h6' sx={{ marginBottom: 1 }}>
              No Service Calls Found.
            </Typography>
          </Card>
        </Stack>
      );

    columns = [
      {
        field: 'id',
        headerName: 'ID',
        minWidth: 110,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'tankId',
        headerName: 'Tank ID',
        minWidth: 110,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'employeeName',
        headerName: 'Employee Name',
        minWidth: 150,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'date',
        headerName: 'Date',
        minWidth: 110,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'edit',
        headerName: 'Edit',
        minWidth: 110,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: editButton
      },
      {
        field: 'alkalinity',
        headerName: 'Alkalinity',
        minWidth: 70,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'calcium',
        headerName: 'Calcium',
        minWidth: 70,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'nitrate',
        headerName: 'Nitrate',
        minWidth: 70,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'phosphate',
        headerName: 'Phosphate',
        minWidth: 70,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'customerNotes',
        headerName: 'Customer Notes',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'employeeNotes',
        headerName: 'Employee Notes',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'unapprovedNotes',
        headerName: 'Unapproved Notes',
        minWidth: 140,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'ATOOperational',
        headerName: 'ATO Operational',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'ATOReservoirFilled',
        headerName: 'ATO Reservoir Filled',
        minWidth: 150,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'chemFilterAdjusted',
        headerName: 'Chem Filter Adjusted',
        minWidth: 150,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'doserAdjustementOrManualDosing',
        headerName: 'Doser-adjusted',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'dosingReservoirsFull',
        headerName: 'Dosing Reservoirs Full',
        minWidth: 170,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'floorsCheckedForSpillsOrDirt',
        headerName: 'Floors Checked',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'glassCleanedInside',
        headerName: 'Glass Cleaned Inside',
        minWidth: 170,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'glassCleanedOutside',
        headerName: 'Glass Cleaned Outside',
        minWidth: 170,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'mechFilterChanged',
        headerName: 'Mech Filter Changed',
        minWidth: 150,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'pumpsClearedOfDebris',
        headerName: 'Pumps Cleared',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'saltCreepCleaned',
        headerName: 'Salt Creep Cleaned',
        minWidth: 150,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'skimmerCleanedAndOperational',
        headerName: 'Skimmer Cleaned',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'waterChanged',
        headerName: 'Water Changed',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'pestAPresent',
        headerName: 'Pest A Present',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'pestBPresent',
        headerName: 'Pest B Present',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'pestCPresent',
        headerName: 'Pest C Present',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'pestDPresent',
        headerName: 'Pest D Present',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center'
      }
    ];

    rows = serviceCallsForTankID.map((s: ServiceCall) => ({
      employeeName: getEmployeeName(s.employeeId),
      ...s,
      date: new Date(s.createdOn).toLocaleDateString(),
      customerNotes: s.customerRequest,
      employeeNotes: s.employeeNotes,
      unapprovedNotes: s.notApprovedNotes,
      ATOOperational: toEmoji(s.ATOOperational),
      ATOReservoirFilled: toEmoji(s.ATOReservoirFilled),
      chemFilterAdjusted: toEmoji(s.chemFilterAdjusted),
      doserAdjustementOrManualDosing: toEmoji(s.doserAdjustementOrManualDosing),
      dosingReservoirsFull: toEmoji(s.dosingReservoirsFull),
      floorsCheckedForSpillsOrDirt: toEmoji(s.floorsCheckedForSpillsOrDirt),
      glassCleanedInside: toEmoji(s.glassCleanedInside),
      glassCleanedOutside: toEmoji(s.glassCleanedOutside),
      mechFilterChanged: toEmoji(s.mechFilterChanged),
      pumpsClearedOfDebris: toEmoji(s.pumpsClearedOfDebris),
      saltCreepCleaned: toEmoji(s.saltCreepCleaned),
      skimmerCleanedAndOperational: toEmoji(s.skimmerCleanedAndOperational),
      waterChanged: toEmoji(s.waterChanged),
      pestAPresent: toEmoji(s.pestAPresent),
      pestBPresent: toEmoji(s.pestBPresent),
      pestCPresent: toEmoji(s.pestCPresent),
      pestDPresent: toEmoji(s.pestDPresent)
    }));
  } else {
    return <div>error</div>;
  }

  return (
    <div>
      <DataGrid
        autoHeight
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hiding leading `id` column as it provides low value to user.
              // Hidden columns can still be turned on from in the UI.
              id: false,
              tankId: false
            }
          }
        }}
        columns={columns}
        rows={rows}
      />
    </div>
  );
}

function toEmoji(b: boolean): string {
  return b ? '\u2713' : '\u0078';
}
