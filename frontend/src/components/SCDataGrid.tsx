import { IconButton, Box, LinearProgress } from '@mui/material';
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
import { Edit as EditIcon } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useGetClientsQuery } from '../redux/slices/users/userManagementSlice';

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
  const [editServiceCallId, setEditServiceCallId] = useState<
    number | undefined
  >();

  const { data: clients, error } = useGetClientsQuery({
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
    const { data: allServiceCalls } = useGetAllServiceCallsQuery({
      isApproved: undefined
    });

    if (!allServiceCalls) return <div>error not allServiceCalls</div>;
    const serviceCallsForEmployee: ServiceCall[] = allServiceCalls.filter(
      (o) => o.employeeId === employeeId
    );

    // TODO does not go to <Link /Tanks?tankId=id> or something...
    // Also should code some way to navigate back from link
    // (unless desired state is saved through normal page navigation)
    const goToTankButton = (params: GridRenderCellParams) => {
      return (
        <>
          <IconButton size='small'>
            <ArrowForwardIcon fontSize='inherit' />
          </IconButton>
        </>
      );
    };

    columns = [
      {
        field: 'id',
        headerName: 'ID',
        flex: 1
      },
      {
        field: 'tankId',
        headerName: 'Tank ID',
        flex: 1
      },
      {
        field: 'clientName',
        headerName: 'Client Name',
        flex: 1
      },
      {
        field: 'date',
        headerName: 'Date',
        flex: 1
      },
      {
        field: 'edit',
        headerName: 'Edit',
        flex: 1,
        sortable: false,
        renderCell: editButton
      },
      {
        field: 'alkalinity',
        headerName: 'Alkalinity',
        flex: 1
      },
      {
        field: 'calcium',
        headerName: 'Calcium',
        flex: 1
      },
      {
        field: 'nitrate',
        headerName: 'Nitrate',
        flex: 1
      },
      {
        field: 'phosphate',
        headerName: 'Phosphate',
        flex: 1
      },
      {
        field: 'customerNotes',
        headerName: 'Customer Notes',
        flex: 1
      },
      {
        field: 'employeeNotes',
        headerName: 'Employee Notes',
        flex: 1
      },
      {
        field: 'unapprovedNotes',
        headerName: 'Unapproved Notes',
        flex: 1
      },
      {
        field: 'ATOOperational',
        headerName: 'ATO Operational',
        flex: 1
      },
      {
        field: 'ATOReservoirFilled',
        headerName: 'ATO Reservoir Filled',
        flex: 1
      },
      {
        field: 'chemFilterAdjusted',
        headerName: 'Chem Filter Adjusted',
        flex: 1
      },
      {
        field: 'doserAdjustementOrManualDosing',
        headerName: 'Doser Adjustment Or Manual Dosing',
        flex: 1
      },
      {
        field: 'dosingReservoirsFull',
        headerName: 'Dosing Reservoirs Full',
        flex: 1
      },
      {
        field: 'floorsCheckedForSpillsOrDirt',
        headerName: 'Floors Checked For Spills Or Dirt',
        flex: 1
      },
      {
        field: 'glassCleanedInside',
        headerName: 'Glass Cleaned Inside',
        flex: 1
      },
      {
        field: 'glassCleanedOutside',
        headerName: 'Glass Cleaned Outside',
        flex: 1
      },
      {
        field: 'mechFilterChanged',
        headerName: 'Mech Filter Changed',
        flex: 1
      },
      {
        field: 'pumpsClearedOfDebris',
        headerName: 'Pumps Cleared Of Debris',
        flex: 1
      },
      {
        field: 'saltCreepCleaned',
        headerName: 'Salt Creep Cleaned',
        flex: 1
      },
      {
        field: 'skimmerCleanedAndOperational',
        headerName: 'Skimmer Cleaned And Operational',
        flex: 1
      },
      {
        field: 'waterChanged',
        headerName: 'Water Changed',
        flex: 1
      },
      {
        field: 'pestAPresent',
        headerName: 'Pest A Present',
        flex: 1
      },
      {
        field: 'pestBPresent',
        headerName: 'Pest B Present',
        flex: 1
      },
      {
        field: 'pestCPresent',
        headerName: 'Pest C Present',
        flex: 1
      },
      {
        field: 'pestDPresent',
        headerName: 'Pest D Present',
        flex: 1
      },
      {
        field: 'linkToTank',
        headerName: 'Link To Tank',
        flex: 1

        // renderCell: goToTankButton,
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
    // Get Clients list with tanks included to find Technician and Client name associated with the service record
    const { data: clients, isLoading } = useGetClientsQuery({
      includeTanks: true,
      isEmployee: undefined
    });
    const { data: serviceCallsForTankID } = useGetServiceCallByTankIdQuery({
      tankId: tank.id
    });

    if (!serviceCallsForTankID) return <div>error</div>;

    columns = [
      {
        field: 'id',
        headerName: 'ID',
        width: 70
      },
      {
        field: 'tankId',
        headerName: 'Tank ID',
        width: 150
      },
      {
        field: 'employeeName',
        headerName: 'Employee Name',
        width: 130
      },
      {
        field: 'date',
        headerName: 'Date',
        width: 150
      },
      {
        field: 'edit',
        headerName: 'Edit',
        width: 70,
        sortable: false
        // renderCell: editButton,
      },
      {
        field: 'alkalinity',
        headerName: 'Alkalinity',
        width: 90
      },
      {
        field: 'calcium',
        headerName: 'Calcium',
        width: 90
      },
      {
        field: 'nitrate',
        headerName: 'Nitrate',
        width: 90
      },
      {
        field: 'phosphate',
        headerName: 'Phosphate',
        width: 90
      },
      {
        field: 'customerNotes',
        headerName: 'Customer Notes',
        width: 150
      },
      {
        field: 'employeeNotes',
        headerName: 'Employee Notes',
        width: 150
      },
      {
        field: 'unapprovedNotes',
        headerName: 'Unapproved Notes',
        width: 150
      },
      {
        field: 'ATOOperational',
        headerName: 'ATO Operational',
        width: 150
      },
      {
        field: 'ATOReservoirFilled',
        headerName: 'ATO Reservoir Filled',
        width: 150
      },
      {
        field: 'chemFilterAdjusted',
        headerName: 'Chem Filter Adjusted',
        width: 150
      },
      {
        field: 'doserAdjustementOrManualDosing',
        headerName: 'Doser Adjustment Or Manual Dosing',
        width: 270
      },
      {
        field: 'dosingReservoirsFull',
        headerName: 'Dosing Reservoirs Full',
        width: 170
      },
      {
        field: 'floorsCheckedForSpillsOrDirt',
        headerName: 'Floors Checked For Spills Or Dirt',
        width: 240
      },
      {
        field: 'glassCleanedInside',
        headerName: 'Glass Cleaned Inside',
        width: 160
      },
      {
        field: 'glassCleanedOutside',
        headerName: 'Glass Cleaned Outside',
        width: 170
      },
      {
        field: 'mechFilterChanged',
        headerName: 'Mech Filter Changed',
        width: 150
      },
      {
        field: 'pumpsClearedOfDebris',
        headerName: 'Pumps Cleared Of Debris',
        width: 180
      },
      {
        field: 'saltCreepCleaned',
        headerName: 'Salt Creep Cleaned',
        width: 150
      },
      {
        field: 'skimmerCleanedAndOperational',
        headerName: 'Skimmer Cleaned And Operational',
        width: 240
      },
      {
        field: 'waterChanged',
        headerName: 'Water Changed',
        width: 120
      },
      {
        field: 'pestAPresent',
        headerName: 'Pest A Present',
        width: 150
      },
      {
        field: 'pestBPresent',
        headerName: 'Pest B Present',
        width: 150
      },
      {
        field: 'pestCPresent',
        headerName: 'Pest C Present',
        width: 150
      },
      {
        field: 'pestDPresent',
        headerName: 'Pest D Present',
        width: 150
      }
    ];

    rows = serviceCallsForTankID.map((s: ServiceCall) => ({
      employeeName: getEmployeeName(s.employeeId),
      ...s,
      date: new Date(s.createdOn).toLocaleDateString(),
      customerNotes: s.customerRequest,
      employeeNotes: s.employeeNotes,
      unapprovedNotes: s.notApprovedNotes
    }));
  } else {
    return <div>error</div>;
  }

  return (
    <div style={{ height: '700px' }}>
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
