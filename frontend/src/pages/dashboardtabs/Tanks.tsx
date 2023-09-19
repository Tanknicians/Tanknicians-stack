import {
  UserOption,
  useGetClientsQuery,
  OwnedTanks,
} from "../../redux/slices/users/userManagementSlice";
import CreateTankForm from "../../components/CreateTankForm";
import UserSearchBar from "../../components/UserSearchBar";
import Typography from "@mui/material/Typography";
import UserCard from "../../components/UserCard";
import Container from "@mui/material/Container";
import Collapse from "@mui/material/Collapse";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { useGetServiceCallByTankIdQuery } from "../../redux/slices/forms/servicecallApiSlice";
import { Edit as EditIcon } from "@mui/icons-material";

function ServiceCallTable({ tank }: { tank: OwnedTanks }) {
  const { data, isLoading } = useGetServiceCallByTankIdQuery({
    tankId: tank.id,
  });

  if (isLoading) {
    return (
      <Box pt={1}>
        <LinearProgress color="primary" />
      </Box>
    );
  }
  if (!data) {
    return <div>"An error occured."</div>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Technician Id</TableCell>
          <TableCell>Edit</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((form) => (
          <TableRow>
            <TableCell>
              {new Date(form.createdOn).toLocaleDateString()}
            </TableCell>
            <TableCell>{form.employeeId}</TableCell>
            <TableCell>
              <IconButton>
                <EditIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function Tanks() {
  const { data: optionsList } = useGetClientsQuery(true);
  const [selectedUser, selectCurrentUser] = useState<UserOption | null>(null);
  const userId = selectedUser?.id;
  const collapse = !!selectedUser;
  const [open, setOpen] = useState(false);
  const [selectedTank, setSelectedTank] = useState<OwnedTanks | undefined>();

  const handleUserSelected = (
    _event: React.SyntheticEvent,
    customer: UserOption | null
  ) => {
    selectCurrentUser(customer);
    setSelectedTank(undefined);
  };

  if (!optionsList) return <div>Loading...</div>;

  return (
    <>
      {userId && (
        <CreateTankForm userId={userId} open={open} setOpen={setOpen} />
      )}
      <Container sx={{ p: 2 }}>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <Typography color="inherit" variant="h4" component="h1">
              Tanks
            </Typography>
          </Grid>
          <Grid item xs={6} sm={7}>
            <Container maxWidth="sm">
              <UserSearchBar
                optionsList={optionsList}
                handleUserSelected={handleUserSelected}
              />
            </Container>
          </Grid>
        </Grid>
        <Collapse in={collapse}>
          <UserCard user={selectedUser} />
          <Divider />
          <Stack direction="row" justifyContent="space-between" sx={{ py: 1 }}>
            <Typography variant="h4">Service Calls</Typography>
            <Button variant="contained" onClick={() => setOpen(true)}>
              <AddIcon />
              Add Tank
            </Button>
          </Stack>
          <Tabs
            value={selectedTank?.id}
            onChange={(_, newTank) =>
              setSelectedTank(
                selectedUser?.OwnedTanks?.find(({ id }) => id === newTank)
              )
            }
          >
            {(selectedUser?.OwnedTanks ?? []).map((tank) => (
              <Tab label={`Tank: ${tank.qrSymbol}`} value={tank.id} />
            ))}
          </Tabs>
          {selectedTank && <ServiceCallTable tank={selectedTank} />}
        </Collapse>
      </Container>
    </>
  );
}
