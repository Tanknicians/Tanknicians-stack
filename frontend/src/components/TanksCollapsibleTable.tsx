import Box from "@mui/material/Box";
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

function Row(props: { row: UpdateTankMetaData }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell
          align="center"
          component="th"
          scope="row"
          sx={{ width: "22%" }}
        >
          {row.volume}
        </TableCell>
        <TableCell align="center" sx={{ width: "22%" }}>
          {row.type}
        </TableCell>
        <TableCell align="center" sx={{ width: "22%" }}>
          {row.tanknicianSourcedOnly ? "Yes" : "No"}
        </TableCell>
        <TableCell align="center" sx={{ width: "22%" }}>
          {new Date(row.lastDateServiced).toLocaleDateString()}
        </TableCell>
        <TableCell align="center" sx={{ width: "12%" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* // TODO: Add tank details here // QR code, description, etc. */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function TanksCollapsibleTable({
  tanks,
}: { tanks: UpdateTankMetaData[] }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Volume</TableCell>
            <TableCell align="center">Tank Type</TableCell>
            <TableCell align="center">Tanknicians' Sourced</TableCell>
            <TableCell align="center">Last Serviced</TableCell>
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
