import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  serviceFormFieldQuestionsBoolean,
  serviceFormFieldQuestionsNumeric,
  serviceFormFieldQuestionsText,
  ServiceFormData,
  serviceFormSchema,
} from "./serviceFormTypesandData";
import { useUploadServiceCallMutation } from "../../../Redux/slices/forms/servicecallApiSlice";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import LoadingProgressButton from "../../LoadingProgressButton";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ServiceForm() {
  // Service call form submission api call
  const [uploadServiceCall, { isLoading }] = useUploadServiceCallMutation();

  const { control, register, handleSubmit, formState } =
    useForm<ServiceFormData>({
      defaultValues: {
        ATOOperational: false,
        ATOReservoirFilled: false,
        chemFilterAdjusted: false,
        doserAdjustementOrManualDosing: false,
        dosingReservoirsFull: false,
        floorsCheckedForSpillsOrDirt: false,
        glassCleanedInside: false,
        glassCleanedOutside: false,
        mechFilterChanged: false,
        pumpsClearedOfDebris: false,
        saltCreepCleaned: false,
        skimmerCleanedAndOperational: false,
        waterChanged: false,
        pestAPresent: false,
        pestBPresent: false,
        pestCPresent: false,
        pestDPresent: false,
        customerRequest: "",
        employeeNotes: "",
      },
      resolver: zodResolver(serviceFormSchema),
      // mode: 'onBlur',
      // reValidateMode: 'onChange',
      // shouldFocusError: true,
      // shouldUnregister: true,
      // criteriaMode: 'firstError'
    });

  const { errors } = formState;

  console.log(errors);

  const onSubmit: SubmitHandler<ServiceFormData> = (data: any) => {
    console.log(data);

    try {
      uploadServiceCall(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  // Only allow numbers and decimal points
  const handleKeyDown = (event: any) => {
    const isValidKey =
      /[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab|\./.test(event.key);

    if (!isValidKey) {
      event.preventDefault();
    }
  };

  const renderedServiceFormQuestionsNumeric =
    serviceFormFieldQuestionsNumeric.map(({ id, label }, index) => (
      <TextField
        key={id}
        autoFocus={index === 0}
        id={`${id}-input`}
        label={label}
        margin="normal"
        {...register(id, { valueAsNumber: true })}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        onKeyDown={handleKeyDown}
        required={!!errors?.[id]}
        error={!!errors?.[id]}
        helperText={errors?.[id]?.message}
      />
    ));

  const renderedServiceFormQuestionsBoolean =
    serviceFormFieldQuestionsBoolean.map(({ id, label }) => (
      <FormControl key={id}>
        <FormLabel id={`${id}-controlled-radio-buttons-group`}>
          {label}
        </FormLabel>
        <Controller
          rules={{ required: true }}
          control={control}
          name={id}
          render={({ field: { onChange, ...rest } }) => (
            <RadioGroup
              row
              aria-labelledby={`${label}-controlled-radio-buttons-group`}
              {...rest}
            >
              <FormControlLabel
                onChange={() => onChange(false)}
                value={false}
                control={<Radio />}
                label="No"
              />
              <FormControlLabel
                onChange={() => onChange(true)}
                value={true}
                control={<Radio />}
                label="Yes"
              />
            </RadioGroup>
          )}
        />
      </FormControl>
    ));

  const renderedServiceFormQuestionsText = serviceFormFieldQuestionsText.map(
    ({ id, label }) => (
      <TextField
        key={id}
        id={`${id}-input`}
        label={label}
        margin="normal"
        {...register(id)}
        required={!!errors?.[id]}
        error={!!errors?.[id]}
        helperText={errors?.[id]?.message}
      />
    ),
  );

  return (
    // temporary styling
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* Questions with expected numeric answers */}
        {renderedServiceFormQuestionsNumeric}
        {/* Questions with expected boolean answers */}
        {renderedServiceFormQuestionsBoolean}
        {/* Questions with expected text answers */}
        {renderedServiceFormQuestionsText}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingProgressButton
            type="submit"
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            isLoading={isLoading}
          >
            Next
          </LoadingProgressButton>
        </Box>
      </Box>
    </Box>
  );
}
