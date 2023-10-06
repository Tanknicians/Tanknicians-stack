import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper, Stack } from "@mui/material";
import UserGrid from "../../components/datagrid/UserGrid";
import TankGrid from "../../components/datagrid/TankGrid";
import ServiceFormGrid from "../../components/datagrid/ServiceFormGrid";

export default function DataExport() {
  return (
    <Container>
      <Stack height={1000} spacing={2} component={Paper} padding={2}>
        <Typography variant="h4">Data Export</Typography>
        <UserGrid />
        <TankGrid />
        <ServiceFormGrid />
      </Stack>
    </Container>
  );
}
