import { IconButton, Box, LinearProgress } from "@mui/material";
import {
  GridRenderCellParams,
  GridColDef,
  GridRowsProp,
  DataGrid,
} from "@mui/x-data-grid";
import { useState } from "react";
import { useGetServiceCallByTankIdQuery } from "../redux/slices/forms/servicecallApiSlice";
import { UpdateTankMetaData, ServiceCall } from "../zodTypes";
import CreateServiceCallModal from "./forms/UpsertServiceCall";
import { Edit as EditIcon } from "@mui/icons-material";

export default function SCDataGridTank({
  tank,
}: {
  tank: UpdateTankMetaData;
}) {
  const [editServiceCallId, setEditServiceCallId] = useState<
    number | undefined
  >();
  const { data, isLoading } = useGetServiceCallByTankIdQuery({
    tankId: tank.id,
  });

  const editButton = (params: GridRenderCellParams) => {
    return (
      <>
        <CreateServiceCallModal
          setOpen={(_) => setEditServiceCallId(undefined)}
          open={editServiceCallId === params.row.id}
          tankId={tank.id}
          employeeId={params.row.employeeId}
          previousServiceCall={params.row}
        />
        <IconButton
          onClick={() => setEditServiceCallId(params.row.id)}
          size="small"
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
      </>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "tankId", headerName: "tankID", width: 70 },
    { field: "name", headerName: "Technician Name", width: 130 },
    { field: "date", headerName: "Date", width: 130 },
    {
      field: "edit",
      headerName: "Edit",
      width: 130,
      sortable: false,
      renderCell: editButton,
    },
    { field: "employeeName", headerName: "Client Name", width: 130 },
    { field: "alkalinity", headerName: "Alkalinity", width: 90 },
    { field: "calcium", headerName: "Calcium", width: 90 },
    { field: "nitrate", headerName: "Nitrate", width: 90 },
    { field: "phosphate", headerName: "Phosphate", width: 90 },
    { field: "customerNotes", headerName: "Customer Notes", width: 90 },
    { field: "employeeNotes", headerName: "Employee Notes", width: 90 },
    { field: "unapprovedNotes", headerName: "Unapproved Notes", width: 90 },
    { field: "ATOOperational", headerName: "ATO Operational", width: 90 },
    {
      field: "ATOReservoirFilled",
      headerName: "ATO Reservoir Filled",
      width: 90,
    },
    {
      field: "chemFilterAdjusted",
      headerName: "Chem Filter Adjusted",
      width: 90,
    },
    {
      field: "doserAdjustementOrManualDosing",
      headerName: "Doser Adjustment Or Manual Dosing",
      width: 90,
    },
    {
      field: "dosingReservoirsFull",
      headerName: "Dosing Reservoirs Full",
      width: 90,
    },
    {
      field: "floorsCheckedForSpillsOrDirt",
      headerName: "Floors Checked For Spills Or Dirt",
      width: 90,
    },
    {
      field: "glassCleanedInside",
      headerName: "Glass Cleaned Inside",
      width: 90,
    },
    {
      field: "glassCleanedOutside",
      headerName: "Glass Cleaned Outside",
      width: 90,
    },
    {
      field: "mechFilterChanged",
      headerName: "Mech Filter Changed",
      width: 90,
    },
    {
      field: "pumpsClearedOfDebris",
      headerName: "Pumps Cleared Of Debris",
      width: 90,
    },
    { field: "saltCreepCleaned", headerName: "Salt Creep Cleaned", width: 90 },
    {
      field: "skimmerCleanedAndOperational",
      headerName: "Skimmer Cleaned And Operational",
      width: 90,
    },
    { field: "waterChanged", headerName: "Water Changed", width: 90 },
    {
      field: "waterTestedRecordedDate",
      headerName: "Water Tested Recorded Date",
      width: 90,
    },
    { field: "pestAPresent", headerName: "Pest A Present", width: 90 },
    { field: "pestBPresent", headerName: "Pest B Present", width: 90 },
    { field: "pestCPresent", headerName: "Pest C Present", width: 90 },
    { field: "pestDPresent", headerName: "Pest D Present", width: 90 },
    { field: "linkToTank", headerName: "Link To Tank", width: 90 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "employeeId", headerName: "Technician ID", width: 130 },
  ];

  function rowCreate(
    id: number,
    tankId: number,
    createdOn: string,
    employeeName: string,
    alkalinity: number,
    calcium: number,
    nitrate: number,
    phosphate: number,
    ATOOperational: boolean,
    ATOReservoirFilled: boolean,
    chemFilterAdjusted: boolean,
    doserAdjustementOrManualDosing: boolean,
    dosingReservoirsFull: boolean,
    floorsCheckedForSpillsOrDirt: boolean,
    glassCleanedInside: boolean,
    glassCleanedOutside: boolean,
    mechFilterChanged: boolean,
    pumpsClearedOfDebris: boolean,
    saltCreepCleaned: boolean,
    waterChanged: boolean,
    waterTestedRecordedDate: boolean,
    pestAPresent: boolean,
    pestBPresent: boolean,
    pestCPresent: boolean,
    pestDPresent: boolean,
  ): {
    id: number;
    tankId: number;
    createdOn: string;
    employeeName: string;
    alkalinity: number;
    calcium: number;
    nitrate: number;
    phosphate: number;
    ATOOperational: boolean;
    ATOReservoirFilled: boolean;
    chemFilterAdjusted: boolean;
    doserAdjustementOrManualDosing: boolean;
    dosingReservoirsFull: boolean;
    floorsCheckedForSpillsOrDirt: boolean;
    glassCleanedInside: boolean;
    glassCleanedOutside: boolean;
    mechFilterChanged: boolean;
    pumpsClearedOfDebris: boolean;
    saltCreepCleaned: boolean;
    waterChanged: boolean;
    waterTestedRecordedDate: boolean;
    pestAPresent: boolean;
    pestBPresent: boolean;
    pestCPresent: boolean;
    pestDPresent: boolean;
  } {
    return {
      id,
      tankId,
      createdOn,
      employeeName,
      alkalinity,
      calcium,
      nitrate,
      phosphate,
      ATOOperational,
      ATOReservoirFilled,
      chemFilterAdjusted,
      doserAdjustementOrManualDosing,
      dosingReservoirsFull,
      floorsCheckedForSpillsOrDirt,
      glassCleanedInside,
      glassCleanedOutside,
      mechFilterChanged,
      pumpsClearedOfDebris,
      saltCreepCleaned,
      waterChanged,
      waterTestedRecordedDate,
      pestAPresent,
      pestBPresent,
      pestCPresent,
      pestDPresent,
    };
  }

  if (isLoading) {
    return (
      <Box pt={1}>
        <LinearProgress color="primary" />
      </Box>
    );
  }

  if (!data) {
    return <div>'An error occurred.'</div>;
  }

  const rows: GridRowsProp = data?.map((s: ServiceCall) => {
    return rowCreate(
      s.id,
      s.tankId,
      new Date(s.createdOn).toLocaleDateString(),
      `fake ${"will noob"} name`,
      s.alkalinity,
      s.calcium,
      s.nitrate,
      s.phosphate,
      s.ATOOperational,
      s.ATOReservoirFilled,
      s.chemFilterAdjusted,
      s.doserAdjustementOrManualDosing,
      s.dosingReservoirsFull,
      s.floorsCheckedForSpillsOrDirt,
      s.glassCleanedInside,
      s.glassCleanedOutside,
      s.mechFilterChanged,
      s.pumpsClearedOfDebris,
      s.saltCreepCleaned,
      s.waterChanged,
      s.waterTestedRecordedDated,
      s.pestAPresent,
      s.pestBPresent,
      s.pestCPresent,
      s.pestDPresent,
    );
  });

  return (
    <div style={{ height: "700px", width: "100%" }}>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
}
