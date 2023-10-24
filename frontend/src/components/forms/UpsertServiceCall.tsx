import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { Control, Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateServiceCallMutation,
  useUpdateServiceCallMutation,
} from "../../redux/slices/forms/servicecallApiSlice";
import {
  createServiceCall as createServiceCallSchema,
  CreateServiceCall,
  ServiceCall,
} from "../../zodTypes";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slices/auth/authSlice";
import UserSearchBar from "../UserSearchBar";
import { useGetClientsQuery } from "../../redux/slices/users/userManagementSlice";
import { useGetTankDataQuery } from "../../redux/slices/tanks/tankDataSlice";
import LoadingOverlay from "../LoadingOverlay";

type FormProps = {
  name: keyof CreateServiceCall;
  type: "string" | "number" | "boolean" | "date" | "full" | "phone";
  control: Control<CreateServiceCall>;
  size?: number;
  multiline?: boolean;
  required?: boolean;
  hidden?: boolean;
};
function getType(input: string) {}
function getLabel(input: string) {
  if (!input) return "";
  let result = input.charAt(0).toUpperCase() + input.slice(1);
  result = result.replace(/(?<!^)([A-Z])/g, " $1");
  result = result.replace(/\b(For|Or|And)\b/g, (match) => match.toLowerCase());

  return result;
}

export function CreateForm({
  name,
  type,
  control,
  size,
  multiline,
  required,
  hidden,
}: FormProps) {
  if (hidden) {
    return null;
  }
  const label = getLabel(name.toString());
  if (type === "boolean") {
    return (
      <Grid item xs={size ?? 4}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => field.onChange(e.target.checked)}
                  checked={!!field.value}
                />
              }
              label={label}
            />
          )}
        />
      </Grid>
    );
  }
  return (
    <Grid item xs={size ?? 3}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          if (type === "date") {
            if (!field.value) {
              field.value = new Date();
            } else if (typeof field.value !== "object") {
              try {
                field.value = new Date(field.value.toString());
              } catch (e) {
                field.value = new Date();
              }
            }
          }
          return (
            <TextField
              error={!!fieldState.error}
              required={!!required}
              fullWidth
              multiline={!!multiline}
              type={
                type === "full" ? "string" : type === "phone" ? "tel" : type
              }
              label={label}
              InputLabelProps={{ shrink: type === "date" ? true : undefined }}
              {...field}
              value={
                type === "date" && typeof field.value === "object"
                  ? format(field.value, "yyyy-MM-dd")
                  : field.value
              }
            />
          );
        }}
      />
    </Grid>
  );
}

const createServiceCallFields: Record<
  keyof CreateServiceCall,
  Omit<FormProps, "name" | "control">
> = {
  employeeId: { type: "number", hidden: true },
  tankId: { type: "number", hidden: true },
  createdOn: { type: "date", required: true, size: 4 },
  customerRequest: { type: "string", size: 12 },
  employeeNotes: { type: "string", size: 12 },

  notApprovedNotes: { type: "string", multiline: true, size: 8 },
  notesUpdated: { type: "date", size: 4 },
  alkalinity: { type: "number", required: true },
  calcium: { type: "number", required: true },
  nitrate: { type: "number", required: true },
  phosphate: { type: "number", required: true },

  ATOOperational: { type: "boolean" },
  ATOReservoirFilled: { type: "boolean" },
  chemFilterAdjusted: { type: "boolean" },
  doserAdjustementOrManualDosing: { type: "boolean" },
  dosingReservoirsFull: { type: "boolean" },
  floorsCheckedForSpillsOrDirt: { type: "boolean" },
  glassCleanedInside: { type: "boolean" },
  glassCleanedOutside: { type: "boolean" },
  mechFilterChanged: { type: "boolean" },
  pumpsClearedOfDebris: { type: "boolean" },
  saltCreepCleaned: { type: "boolean" },
  skimmerCleanedAndOperational: { type: "boolean" },
  waterChanged: { type: "boolean" },
  waterTestedRecordedDated: { type: "boolean" },

  pestAPresent: { type: "boolean" },
  pestBPresent: { type: "boolean" },
  pestCPresent: { type: "boolean" },
  pestDPresent: { type: "boolean" },
  isApproved: { type: "boolean" },
};

const defaultValues: CreateServiceCall = Object.fromEntries(
  Object.entries(createServiceCallFields).map(([key, { type }]) => {
    switch (type) {
      case "boolean":
        return [key, false];
      case "date":
        return [key, new Date()];
      case "string":
        return [key, ""];
      case "number":
        return [key, 0];
      case "full":
        return [key, ""];
      case "phone":
        return [key, ""];
    }
  })
);
defaultValues.isApproved = true;

export default function CreateServiceCallModal({
  open,
  setOpen,
  tankId,
  employeeId: prevEmployeeId,
  previousServiceCall,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  employeeId: number;
  tankId: number;
  previousServiceCall?: ServiceCall;
}) {
  let id: undefined | number;
  let previousValues: undefined | CreateServiceCall;
  const loggedInUser = useSelector(selectCurrentUser);

  const { data: employees } = useGetClientsQuery({
    includeTanks: true,
    isEmployee: true,
  });
  const { data: tank } = useGetTankDataQuery(tankId);

  if (previousServiceCall) {
    const { id: _id, ..._previousValues } = previousServiceCall;
    id = _id;
    previousValues = _previousValues;
  }

  const isEdit = !!previousServiceCall && !!id && !!previousValues;

  const { handleSubmit, control, reset, setValue, watch } =
    useForm<CreateServiceCall>({
      resolver: zodResolver(createServiceCallSchema),
      defaultValues: {
        ...defaultValues,
        ...previousValues,
        tankId,
        employeeId: isEdit ? prevEmployeeId : loggedInUser.userId,
      },
    });
  const employeeId = watch("employeeId");
  const employee =
    employees?.find((employee) => employee.id === employeeId) ?? null;

  function handleClose() {
    if (isLoading) return;
    setOpen(false);
    reset();
  }

  const [createServiceCall, { isLoading: isCreateLoading }] =
    useCreateServiceCallMutation();

  const [updateServiceCall, { isLoading: isUpdateLoading }] =
    useUpdateServiceCallMutation();

  const isLoading = isCreateLoading || isUpdateLoading;

  const onValid: SubmitHandler<CreateServiceCall> = async (
    data: CreateServiceCall
  ) => {
    try {
      const response =
        isEdit && id
          ? await updateServiceCall({ id, ...data })
          : await createServiceCall(data);
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  const fields = Object.entries(createServiceCallFields).map(
    ([key, value]) => ({ name: key as keyof CreateServiceCall, ...value })
  );

  function checkAllCheckboxes(value: boolean) {
    fields.forEach((field) => {
      if (field.type === "boolean") {
        setValue(field.name, value);
      }
    });
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      {isLoading && <LoadingOverlay />}
      <DialogTitle>
        {previousServiceCall
          ? `Update Service Call ${previousServiceCall.id}`
          : "Create Service Call"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} paddingTop={1}>
          <Grid item xs={4}>
            {employees ? (
              <UserSearchBar
                userList={employees ?? []}
                selectedUser={employee}
                handleUserSelected={(_, user) =>
                  user?.id && setValue("employeeId", user.id)
                }
                label="Employee"
              />
            ) : (
              <Box>Loading...</Box>
            )}
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={tank?.nickname ?? "Loading..."}
              disabled
              fullWidth
            />
          </Grid>
          {fields.map((field) => (
            <CreateForm key={field.name} control={control} {...field} />
          ))}
          <Grid item xs={4}>
            <Button
              onClick={(e) => checkAllCheckboxes(true)}
              size="small"
              variant="contained"
            >
              Check All Checkboxes
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type="button"
          onClick={handleSubmit(onValid)}
          variant="contained"
          disabled={isLoading}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
