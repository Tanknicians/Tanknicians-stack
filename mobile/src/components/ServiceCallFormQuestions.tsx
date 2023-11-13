import { MobileServiceCallQuestions } from '../types/zodTypes';
import {
  PRIMARY_COLOR,
  QUARTERNARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR
} from '../types/Styling';
import { Controller, Control, UseFormSetValue } from 'react-hook-form';
import {
  Text,
  HelperText,
  TextInput,
  SegmentedButtons
} from 'react-native-paper';
import servicecallstyles from '../styles/servicecall';
import { Keyboard } from 'react-native';

export default function ServiceCallFormQuestions({
  control
}: {
  control: Control<MobileServiceCallQuestions>;
}) {
  const fields = Object.entries(createServiceCallFields).map(
    ([key, value]) => ({
      name: key as keyof MobileServiceCallQuestions,
      ...value
    })
  );

  return (
    <>
      {fields.map((field) => (
        <CreateForm key={field.name} control={control} {...field} />
      ))}
    </>
  );
}

function CreateForm({
  name,
  type,
  control,
  multiline,
  required,
  hidden,
  autofocus
}: FormProps) {
  if (hidden) {
    return null;
  }
  const label = getLabel(name.toString());
  if (type === 'boolean') {
    return (
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field }) => {
          const handleValueChange = (newValue: string) => {
            Keyboard.dismiss();
            field.onChange(newValue === 'true' ? true : false);
          };
          return (
            <>
              <Text style={servicecallstyles.label}>{label}</Text>
              <SegmentedButtons
                value={field.value ? 'true' : 'false'}
                onValueChange={handleValueChange}
                buttons={[
                  {
                    label: 'No',
                    value: 'false',
                    checkedColor: TERTIARY_COLOR,
                    style: field.value
                      ? { backgroundColor: TERTIARY_COLOR }
                      : { backgroundColor: QUARTERNARY_COLOR }
                  },
                  {
                    label: 'Yes',
                    value: 'true',
                    checkedColor: TERTIARY_COLOR,
                    uncheckedColor: PRIMARY_COLOR,
                    style: field.value
                      ? { backgroundColor: PRIMARY_COLOR }
                      : { backgroundColor: TERTIARY_COLOR }
                  }
                ]}
                style={servicecallstyles.segmentedButtons}
              />
            </>
          );
        }}
      />
    );
  } else if (type === 'number') {
    return (
      <Controller
        name={name}
        control={control}
        rules={{
          required: true,
          value: 'number'
        }}
        render={({ field, fieldState }) => {
          return (
            <>
              <Text style={servicecallstyles.label}>{label}</Text>
              <TextInput
                mode='outlined'
                keyboardType='decimal-pad'
                placeholder='0'
                onBlur={field.onBlur}
                value={
                  field.value !== undefined ? String(field.value) : undefined
                }
                onChange={(event) => {
                  // Handle decimal point and leading zero
                  let sanitizedValue = event.nativeEvent.text.replace(
                    /[^0-9.]/g,
                    ''
                  ); // Remove non-numeric and non-decimal characters
                  const decimalCount = (sanitizedValue.match(/\./g) || [])
                    .length;
                  // Pad leading zero if input starts with a decimal
                  if (sanitizedValue.startsWith('.')) {
                    sanitizedValue = `0${sanitizedValue}`;
                  }
                  if (decimalCount <= 1) {
                    field.onChange(sanitizedValue);
                  }
                }}
                autoFocus={autofocus}
                activeUnderlineColor={PRIMARY_COLOR}
                activeOutlineColor={PRIMARY_COLOR}
                outlineColor={SECONDARY_COLOR}
                error={!!fieldState.error}
                style={servicecallstyles.input}
                outlineStyle={servicecallstyles.inputoutline}
              />
              <HelperText type='error' visible={!!fieldState.error}>
                {fieldState.error?.message}
              </HelperText>
            </>
          );
        }}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <>
            <Text style={servicecallstyles.label}>
              {`${label} ${!required ? '(Optional)' : ''}`}
            </Text>

            <TextInput
              mode='outlined'
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              activeUnderlineColor={PRIMARY_COLOR}
              activeOutlineColor={PRIMARY_COLOR}
              outlineColor={SECONDARY_COLOR}
              value={field.value !== undefined ? String(field.value) : ''} // Convert value to a string explicitly or set it as an empty string if undefined
              style={servicecallstyles.input}
              outlineStyle={servicecallstyles.inputoutline}
              multiline={multiline}
            />
            <HelperText type='error' visible={!!fieldState.error}>
              {fieldState.error?.message}{' '}
            </HelperText>
          </>
        );
      }}
    />
  );
}

type FormProps = {
  name: keyof MobileServiceCallQuestions;
  type: 'string' | 'number' | 'boolean' | 'date' | 'full' | 'phone';
  control: Control<MobileServiceCallQuestions>;
  multiline?: boolean;
  required?: boolean;
  hidden?: boolean;
  autofocus?: boolean;
};

function getLabel(input: string) {
  if (!input) return '';
  let result = input.charAt(0).toUpperCase() + input.slice(1);
  result = result.replace(/(?<!^)([A-Z])/g, ' $1');
  result = result.replace(/\b(For|Or|And)\b/g, (match) => match.toLowerCase());

  return result;
}

// Fields that are hidden are not shown in the mobile form but added when the form is submitted
const createServiceCallFields: Record<
  keyof MobileServiceCallQuestions,
  Omit<FormProps, 'name' | 'control'>
> = {
  // created on is set to the current date when the form is submitted. refer to ServiceCallFormScreen.tsx onValid
  createdOn: { type: 'date', hidden: true },

  notesUpdated: { type: 'date', hidden: true },
  alkalinity: { type: 'number', required: true, autofocus: true },
  calcium: { type: 'number', required: true },
  nitrate: { type: 'number', required: true },
  phosphate: { type: 'number', required: true },

  ATOOperational: { type: 'boolean' },
  ATOReservoirFilled: { type: 'boolean' },
  chemFilterAdjusted: { type: 'boolean' },
  doserAdjustementOrManualDosing: { type: 'boolean' },
  dosingReservoirsFull: { type: 'boolean' },
  floorsCheckedForSpillsOrDirt: { type: 'boolean' },
  glassCleanedInside: { type: 'boolean' },
  glassCleanedOutside: { type: 'boolean' },
  mechFilterChanged: { type: 'boolean' },
  pumpsClearedOfDebris: { type: 'boolean' },
  saltCreepCleaned: { type: 'boolean' },
  skimmerCleanedAndOperational: { type: 'boolean' },
  waterChanged: { type: 'boolean' },
  waterTestedRecordedDated: { type: 'boolean' },

  pestAPresent: { type: 'boolean' },
  pestBPresent: { type: 'boolean' },
  pestCPresent: { type: 'boolean' },
  pestDPresent: { type: 'boolean' },

  // These fields are not required and shown last in the form
  customerRequest: { type: 'string', required: false, multiline: true },
  employeeNotes: { type: 'string', required: false, multiline: true }
};

export const defaultValues: MobileServiceCallQuestions = Object.fromEntries(
  Object.entries(createServiceCallFields).map(([key, { type }]) => {
    switch (type) {
      case 'boolean':
        return [key, false];
      case 'date':
        return [key, new Date()];
      case 'string':
        return [key, ''];
      case 'number':
        return [key, undefined];
      case 'full':
        return [key, ''];
      case 'phone':
        return [key, ''];
    }
  })
);
