import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { UpdateTankMetaData } from "../zodTypes";
import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import QRCodeCard from "./QRCodeCard";
import { UserData } from "../redux/slices/users/userManagementSlice";
import { ArrowCircleRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Row(props: { row: UpdateTankMetaData }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function gotoTank(tankId: number) {
    navigate(`/dashboard/Tanks?tankId=${tankId}`);
  }

  return (
    <>
      <TableRow onClick={() => setOpen(!open)}>
        <TableCell align="center" sx={{ flex: 1 }}>
          {row.description}
        </TableCell>
        <TableCell align="center" sx={{ flex: 1 }}>
          {row.volume}
        </TableCell>
        <TableCell align="center" sx={{ flex: 1 }}>
          {row.type}
        </TableCell>
        <TableCell align="center" sx={{ flex: 1 }}>
          {row.tanknicianSourcedOnly ? "Yes" : "No"}
        </TableCell>
        <TableCell align="center" sx={{ flex: 1 }}>
          {new Date(row.lastDateServiced).toLocaleDateString()}
        </TableCell>

        <TableCell align="center" sx={{ flex: 1 }}>
          <IconButton size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Stack
              alignItems="center"
              spacing={2}
              direction="row"
              justifyContent="space-around"
            >
              <Stack
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
              >
                <Typography variant="h6" gutterBottom>
                  QR Code
                </Typography>
                <QRCodeCard
                  client={CURRENTCLIENT}
                  tankId={row.id}
                  qrSymbol={row.qrSymbol}
                />
              </Stack>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Typography variant="h6" gutterBottom>
                  QR Code
                </Typography>
                <Button
                  variant="outlined"
                  endIcon={<ArrowCircleRight />}
                  onClick={() => gotoTank(row.id)}
                >
                  Go to tank view
                </Button>
              </Stack>
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

let CURRENTCLIENT = {} as UserData;

export default function TanksCollapsibleTable({
  client,
  tanks,
}: {
  client: UserData;
  tanks: UpdateTankMetaData[];
}) {
  CURRENTCLIENT = client;
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ flex: 1 }}>
              Nickname
            </TableCell>
            <TableCell align="center" sx={{ flex: 1 }}>
              Volume
            </TableCell>
            <TableCell align="center" sx={{ flex: 1 }}>
              Tank Type
            </TableCell>
            <TableCell align="center" sx={{ flex: 1 }}>
              Tanknicians-Sourced
            </TableCell>
            <TableCell align="center" sx={{ flex: 1 }}>
              Last Serviced
            </TableCell>
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
