import {
  clearTankId,
  selectCurrentClientTank
} from '../redux/slices/forms/servicecallTankSlice';
import { useUploadServiceCallMutation } from '../redux/slices/forms/servicecallApiSlice';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TextInput, SegmentedButtons } from 'react-native-paper';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { selectCurrentUser } from '../redux/slices/auth/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaskedTextInput } from 'react-native-mask-text';
import { useSelector, useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { MAIN_COLOR } from '../types/Constants';
import { Routes } from '../types/Routes';
import {
  serviceFormFieldQuestionsBoolean,
  serviceFormFieldQuestionsNumeric,
  serviceFormFieldQuestionsText,
  ServiceFormData,
  serviceFormSchema
} from '../serviceFormTypesandData';
import React from 'react';

type Props = NativeStackScreenProps<Routes, 'ServiceCallForm'>;

const ServiceCallForm = ({ navigation }: Props) => {
  const [uploadServiceCall, { isLoading }] = useUploadServiceCallMutation();
  const clientTankId = useSelector(selectCurrentClientTank);
  const employeeId = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  console.log('TankId: ', clientTankId);

  const { control, handleSubmit, formState } = useForm<ServiceFormData>({
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
      customerRequest: '',
      employeeNotes: ''
    },
    resolver: zodResolver(serviceFormSchema)
  });

  const { errors } = formState;

  console.log(errors);

  const onSubmit: SubmitHandler<ServiceFormData> = (data: any) => {
    const dataWithEmployeeandTankId = {
      ...data,
      employeeId: employeeId?.userId,
      tankId: clientTankId
    };
    console.log(dataWithEmployeeandTankId);
    try {
      uploadServiceCall(dataWithEmployeeandTankId).unwrap();
      dispatch(clearTankId());
      navigation.navigate('QRScannerScreen');
    } catch (error) {
      console.log(error);
    }
  };
  const renderedServiceFormQuestionsNumeric =
    serviceFormFieldQuestionsNumeric.map(({ id, label }, index) => (
      <View key={id} style={styles.inputView}>
        <Text style={styles.label}>{label}</Text>
        <Controller
          control={control}
          name={id}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <MaskedTextInput
              mask='9.99'
              onBlur={onBlur}
              type='number'
              onChangeText={number => {
                onChange(parseFloat(number));
              }}
              value={value?.toString() ?? ''} // Convert value to a string explicitly or set it as an empty string if undefined
              autoFocus={index === 0}
              placeholder='0.00'
              keyboardType='numeric'
              style={styles.input}
            />
          )}
        />
      </View>
    ));

  const renderedServiceFormQuestionsBoolean =
    serviceFormFieldQuestionsBoolean.map(({ id, label }) => (
      <Controller
        key={id}
        control={control}
        name={id}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => {
          const handleValueChange = (newValue: string) => {
            onChange(newValue === 'true' ? true : false);
          };
          return (
            <View>
              <Text style={{ marginBottom: 10 }}>{label}</Text>
              <SegmentedButtons
                value={value ? 'true' : 'false'}
                onValueChange={handleValueChange}
                buttons={[
                  {
                    label: 'No',
                    value: 'false',
                    checkedColor: '#333',
                    style: value
                      ? { backgroundColor: 'white' }
                      : { backgroundColor: '#dcd7d7' }
                  },
                  {
                    label: 'Yes',
                    value: 'true',
                    checkedColor: 'white',
                    uncheckedColor: MAIN_COLOR,
                    style: value
                      ? { backgroundColor: MAIN_COLOR }
                      : { backgroundColor: 'white' }
                  }
                ]}
                style={{ marginBottom: 20 }}
              />
            </View>
          );
        }}
      />
    ));

  const renderedServiceFormQuestionsText = serviceFormFieldQuestionsText.map(
    ({ id, label }) => (
      <Controller
        key={id}
        control={control}
        name={id}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            key={id}
            id={`${id}-input`}
            label={label}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value !== undefined ? String(value) : ''} // Convert value to a string explicitly or set it as an empty string if undefined
            mode='outlined'
            multiline
            error={!!errors?.[id]}
          />
        )}
      />
    )
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ServiceCallForm </Text>
      <ScrollView style={styles.scrollView}>
        {/* Questions with expected numeric answers */}
        {renderedServiceFormQuestionsNumeric}
        {/* Questions with expected boolean answers */}
        {renderedServiceFormQuestionsBoolean}
        {/* Questions with expected text answers */}
        {renderedServiceFormQuestionsText}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceCallForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    color: MAIN_COLOR,
    marginTop: 10,
    marginBottom: 40
  },
  input: {
    height: 40,
    marginHorizontal: 0,
    marginVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10
  },
  inputView: {
    marginBottom: 10
  },
  label: { marginBottom: 10 },
  scrollView: {
    marginHorizontal: 20,
    width: '80%'
  },
  submitButton: {
    width: '80%',
    backgroundColor: MAIN_COLOR,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  submitButtonText: {
    color: 'white',
    fontSize: 20
  }
});
