import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { Control, Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useUploadServiceCallMutation } from "../../redux/slices/forms/servicecallApiSlice";

export const serviceCallSchema = z.object({
  id: z.coerce.number().int(),
  isApproved: z.boolean().default(false).optional(),
  createdOn: z.string(), // date but the picker is always a date

  customerRequest: z.string().optional(),
  employeeNotes: z.string().optional(),

  notApprovedNotes: z.string().optional(),
  notesUpdated: z.string(), // date but the picker is always a date

  alkalinity: z.coerce.number(),
  calcium: z.coerce.number(),
  nitrate: z.coerce.number(),
  phosphate: z.coerce.number(),

  ATOOperational: z.boolean().default(false),
  ATOReservoirFilled: z.boolean().default(false),
  chemFilterAdjusted: z.boolean().default(false),
  doserAdjustementOrManualDosing: z.boolean().default(false),
  dosingReservoirsFull: z.boolean().default(false),
  floorsCheckedForSpillsOrDirt: z.boolean().default(false),
  glassCleanedInside: z.boolean().default(false),
  glassCleanedOutside: z.boolean().default(false),
  mechFilterChanged: z.boolean().default(false),
  pumpsClearedOfDebris: z.boolean().default(false),
  saltCreepCleaned: z.boolean().default(false),
  skimmerCleanedAndOperational: z.boolean().default(false),
  waterChanged: z.boolean().default(false),
  waterTestedRecordedDated: z.boolean().default(false),

  pestAPresent: z.boolean().default(false),
  pestBPresent: z.boolean().default(false),
  pestCPresent: z.boolean().default(false),
  pestDPresent: z.boolean().default(false),
  employeeId: z.coerce.number().int(),
  tankId: z.coerce.number().int(),
});

export const createServiceCall = serviceCallSchema.omit({ id: true });
export type CreateServiceCall = z.infer<typeof createServiceCall>;

type CreateFormProps = {
  name: keyof CreateServiceCall;
  type: "string" | "number" | "boolean" | "date" | "full";
  control: Control<CreateServiceCall>;
  size?: number;
  multiline?: boolean;
  required?: boolean;
};

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
}: CreateFormProps) {
  const label = getLabel(name);

  if (type === "boolean") {
    return (
      <Grid item xs={size ?? 4}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <FormControlLabel control={<Checkbox {...field} />} label={label} />
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
          return (
            <TextField
              error={!!fieldState.error}
              required={!!required}
              fullWidth
              multiline={!!multiline}
              type={type === "full" ? "string" : type}
              label={label}
              InputLabelProps={{ shrink: type === "date" ? true : undefined }}
              {...field}
              value={field.value ?? ""}
            />
          );
        }}
      />
    </Grid>
  );
}

const createServiceCallFields: Record<
  keyof CreateServiceCall,
  Omit<CreateFormProps, "name" | "control">
> = {
  employeeId: { type: "number", required: true, size: 4 },
  tankId: { type: "number", required: true, size: 4 },
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

export default function CreateServiceCallModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { handleSubmit, control, reset } = useForm<CreateServiceCall>({
    resolver: zodResolver(createServiceCall),
  });

  function handleClose() {
    setOpen(false);
    reset();
  }

  const [uploadServiceCall, { isLoading }] = useUploadServiceCallMutation();

  const onValid: SubmitHandler<CreateServiceCall> = async (
    data: CreateServiceCall
  ) => {
    try {
      const response = await uploadServiceCall(data);
      console.log({ response });
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  const fields = (
    Object.keys(
      createServiceCallFields
    ) as (keyof typeof createServiceCallFields)[]
  )
    .map((key) => ({ name: key, ...createServiceCallFields[key] }))
    .filter((field) => field.name !== "isApproved");

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} paddingTop={1}>
          {fields.map((field) => (
            <CreateForm key={field.name} control={control} {...field} />
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type="button"
          onClick={handleSubmit(onValid)}
          startIcon={isLoading ? <CircularProgress /> : null}
          disabled={isLoading}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
