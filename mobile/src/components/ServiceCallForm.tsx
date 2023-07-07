import {
  clearTankId,
  selectCurrentClientTank
} from '../redux/slices/forms/servicecallTankSlice';
import { useUploadServiceCallMutation } from '../redux/slices/forms/servicecallApiSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Text,
  TextInput,
  SegmentedButtons,
  HelperText
} from 'react-native-paper';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { selectCurrentUser } from '../redux/slices/auth/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaskedTextInput } from 'react-native-mask-text';
import { useSelector, useDispatch } from 'react-redux';
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  ERROR_COLOR
} from '../types/Constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Routes } from '../types/Routes';
import {
  serviceFormFieldQuestionsBoolean,
  serviceFormFieldQuestionsNumeric,
  serviceFormFieldQuestionsText,
  ServiceFormData,
  serviceFormSchema
} from '../serviceFormTypesandData';
import LoadingScreen from './LoadingScreen';
import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';

type Props = NativeStackScreenProps<Routes, 'ServiceCallForm'>;

const ServiceCallForm = ({ navigation }: Props) => {
  const [uploadServiceCall, { isLoading }] = useUploadServiceCallMutation();
  const clientTankId = useSelector(selectCurrentClientTank);
  const employeeId = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToPosition(0, 0, true);
    }
  };

  console.log('clientTankId: ', clientTankId);

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

  if (!!errors) scrollToTop();

  console.log('Errors: ', errors);

  const onSubmit: SubmitHandler<ServiceFormData> = async (data: any) => {
    const dataWithEmployeeandTankId = {
      ...data,
      employeeId: employeeId?.userId,
      tankId: clientTankId
    };

    try {
      const response = await uploadServiceCall(
        dataWithEmployeeandTankId
      ).unwrap();
      console.log('response; ', response);
      dispatch(clearTankId());
      navigation.replace('QRScannerScreen');
    } catch (err: any) {
      if (!err?.status) {
        // isLoading: true until timeout occurs
        console.log('No Server Response');
      } else if (err?.status === 400) {
        console.log(err.data?.message);
      } else if (err?.status === 401) {
        console.log(err.data?.message);
      } else {
        console.log(err.data?.message);
      }
    }
  };

  const renderedServiceFormQuestionsNumeric =
    serviceFormFieldQuestionsNumeric.map(({ id, label }, index) => {
      return (
        <Controller
          key={id}
          control={control}
          name={id}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text style={styles.label}>{label}</Text>
              <MaskedTextInput
                type='number'
                keyboardType='numeric'
                mask='9.999'
                placeholder='0.00'
                onBlur={onBlur}
                value={value?.toString() ?? ''} // Convert value to a string explicitly or set it as an empty string if undefined
                onChangeText={value => onChange(parseFloat(value))}
                style={[styles.input, errors?.[id] && styles.errorInput]}
                defaultValue=''
              />
              <HelperText type='error' visible={!!errors[id]}>
                {errors[id]?.message}
              </HelperText>
            </>
          )}
        />
      );
    });

  const renderedServiceFormQuestionsBoolean =
    serviceFormFieldQuestionsBoolean.map(({ id, label }) => (
      <Controller
        key={id}
        control={control}
        name={id}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => {
          const handleValueChange = (newValue: string) => {
            Keyboard.dismiss();
            onChange(newValue === 'true' ? true : false);
          };
          return (
            <>
              <Text style={styles.label}>{label}</Text>
              <SegmentedButtons
                value={value ? 'true' : 'false'}
                onValueChange={handleValueChange}
                buttons={[
                  {
                    label: 'No',
                    value: 'false',
                    checkedColor: TERTIARY_COLOR,
                    style: value
                      ? { backgroundColor: TERTIARY_COLOR }
                      : { backgroundColor: '#6a6e75' }
                  },
                  {
                    label: 'Yes',
                    value: 'true',
                    checkedColor: TERTIARY_COLOR,
                    uncheckedColor: PRIMARY_COLOR,
                    style: value
                      ? { backgroundColor: PRIMARY_COLOR }
                      : { backgroundColor: TERTIARY_COLOR }
                  }
                ]}
                style={styles.segmentedButtons}
              />
            </>
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
          <>
            <Text style={styles.label}>{`${label} (optional)`}</Text>
            <TextInput
              key={id}
              id={`${id}-input`}
              mode='outlined'
              onBlur={onBlur}
              onChangeText={onChange}
              activeOutlineColor={PRIMARY_COLOR}
              value={value !== undefined ? String(value) : ''} // Convert value to a string explicitly or set it as an empty string if undefined
              error={!!errors?.[id]}
              style={{
                marginBottom: 14
              }}
              multiline
            />
          </>
        )}
      />
    )
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      {isLoading && <LoadingScreen />}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Service-Call Form</Text>
      </View>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        style={styles.keyboardAwareContainer}
        contentContainerStyle={styles.keyboardAwareContent}
        keyboardDismissMode='on-drag'
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps={'handled'}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        enableResetScrollToCoords={false}
        // Values below are not finalized
        extraScrollHeight={Platform.select({
          ios: 200,
          android: 120
        })}
      >
        {/* Questions with expected numeric answers */}
        {renderedServiceFormQuestionsNumeric}
        {/* Questions with expected boolean answers */}
        {renderedServiceFormQuestionsBoolean}
        {/* Questions with expected text answers */}
        {renderedServiceFormQuestionsText}
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ServiceCallForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    paddingBottom: 30
  },
  keyboardAwareContainer: {
    flex: 1,
    backgroundColor: TERTIARY_COLOR,
    width: '100%',
    borderWidth: 1,
    borderRadius: 4
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  header: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 34,
    color: '#F3FAFF',
    marginTop: 15,
    marginBottom: 15
  },
  input: {
    height: 50,
    marginHorizontal: 0,
    marginVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5
  },
  errorInput: {
    borderColor: ERROR_COLOR,
    borderWidth: 2
  },
  inputView: {
    marginBottom: 5
  },
  label: {
    fontSize: 16
  },
  segmentedButtons: { marginTop: 8, marginBottom: 20 },
  keyboardAwareContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingBottom: 20
  },
  submitButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitButton: {
    width: '80%',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40
  },
  submitButtonText: {
    color: TERTIARY_COLOR,
    fontSize: 20
  }
});
