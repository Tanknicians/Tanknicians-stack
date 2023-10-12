import Typography from "@mui/material/Typography";
import { Grid, Container, Paper, Stack } from "@mui/material";
import UserGrid from "../../components/datagrid/UserGrid";
import TankGrid from "../../components/datagrid/TankGrid";
import ServiceFormGrid from "../../components/datagrid/ServiceFormGrid";

const gridContainerStyle = {
  maxHeight: 600,
};

export default function DataExport() {
  return (
    <>
      <Grid container spacing={1} maxWidth={"100%"}>
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Typography variant="h4" component="h1">
            Data Export
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Stack
            height={1000}
            maxWidth={"100%"}
            spacing={2}
            component={Paper}
            padding={2}
          >
            <Typography variant="h6" component="h1">
              Users
            </Typography>
            <UserGrid />
            <Typography variant="h6" component="h1">
              Tanks
            </Typography>
            <TankGrid />
            <Typography variant="h6" component="h1">
              Service Calls
            </Typography>
            <ServiceFormGrid />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
