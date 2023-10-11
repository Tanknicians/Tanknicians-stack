import {
  ServiceFormData,
  serviceFormFieldQuestionsNumeric,
  serviceFormFieldQuestionsBoolean,
  serviceFormFieldQuestionsText,
} from "../zodTypes";
import {
  PRIMARY_COLOR,
  QUARTERNARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
} from "../types/Styling";
import { TextInput as RNTextInput } from "react-native-paper";
import { Controller, Control } from "react-hook-form";
import { Text, HelperText } from "react-native-paper";
import servicecallstyles from "../styles/servicecall";
import { SegmentedButtons } from "react-native-paper";
import { Keyboard } from "react-native";

export const ServiceCallFormQuestions = ({
  control,
}: {
  control: Control<ServiceFormData>;
}) => {
  return (
    <>
      <RenderedServiceFormQuestionsNumeric control={control} />
      <RenderedServiceFormQuestionsBoolean control={control} />
      <RenderedServiceFormQuestionsText control={control} />
    </>
  );
};

const RenderedServiceFormQuestionsNumeric = ({
  control,
}: {
  control: Control<ServiceFormData>;
}) => {
  return serviceFormFieldQuestionsNumeric.map(({ id, label }, index) => (
    <Controller
      key={id}
      control={control}
      name={id}
      rules={{ required: true }}
      render={({ field, fieldState }) => (
        <>
          <Text style={servicecallstyles.label}>{label}</Text>
          <RNTextInput
            mode="outlined"
            keyboardType="numeric"
            autoFocus={index === 0}
            placeholder="0"
            onBlur={field.onBlur}
            value={field.value !== undefined ? String(field.value) : ""}
            onChangeText={field.onChange}
            activeUnderlineColor={PRIMARY_COLOR}
            activeOutlineColor={PRIMARY_COLOR}
            outlineColor={SECONDARY_COLOR}
            error={!!fieldState.error}
            style={servicecallstyles.input}
            outlineStyle={servicecallstyles.inputoutline}
          />
          <HelperText type="error" visible={!!fieldState.error}>
            {fieldState.error?.message}
          </HelperText>
        </>
      )}
    />
  ));
};

const RenderedServiceFormQuestionsBoolean = ({
  control,
}: {
  control: Control<ServiceFormData>;
}) => {
  return serviceFormFieldQuestionsBoolean.map(({ id, label }) => (
    <Controller
      key={id}
      control={control}
      name={id}
      rules={{ required: true }}
      render={({ field }) => {
        const handleValueChange = (newValue: string) => {
          Keyboard.dismiss();
          field.onChange(newValue === "true" ? true : false);
        };
        return (
          <>
            <Text style={servicecallstyles.label}>{label}</Text>
            <SegmentedButtons
              value={field.value ? "true" : "false"}
              onValueChange={handleValueChange}
              buttons={[
                {
                  label: "No",
                  value: "false",
                  checkedColor: TERTIARY_COLOR,
                  style: field.value
                    ? { backgroundColor: TERTIARY_COLOR }
                    : { backgroundColor: QUARTERNARY_COLOR },
                },
                {
                  label: "Yes",
                  value: "true",
                  checkedColor: TERTIARY_COLOR,
                  uncheckedColor: PRIMARY_COLOR,
                  style: field.value
                    ? { backgroundColor: PRIMARY_COLOR }
                    : { backgroundColor: TERTIARY_COLOR },
                },
              ]}
              style={servicecallstyles.segmentedButtons}
            />
          </>
        );
      }}
    />
  ));
};

const RenderedServiceFormQuestionsText = ({
  control,
}: {
  control: Control<ServiceFormData>;
}) => {
  return serviceFormFieldQuestionsText.map(({ id, label }) => (
    <Controller
      key={id}
      control={control}
      name={id}
      rules={{ required: true }}
      render={({ field }) => (
        <>
          <Text style={servicecallstyles.label}>{`${label} (optional)`}</Text>
          <RNTextInput
            key={id}
            mode="outlined"
            id={`${id}-input`}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            activeUnderlineColor={PRIMARY_COLOR}
            activeOutlineColor={PRIMARY_COLOR}
            outlineColor={SECONDARY_COLOR}
            value={field.value !== undefined ? String(field.value) : ""} // Convert value to a string explicitly or set it as an empty string if undefined
            style={servicecallstyles.input}
            outlineStyle={servicecallstyles.inputoutline}
            multiline
          />
        </>
      )}
    />
  ));
};

export default ServiceCallFormQuestions;
