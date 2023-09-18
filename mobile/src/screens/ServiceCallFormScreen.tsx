import { useUploadServiceCallMutation } from '../redux/slices/forms/servicecallApiSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { selectCurrentUser } from '../redux/slices/auth/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingSpinner from '../components/LoadingSpinner';
import { QRSCANNERSCREEN, Routes } from '../types/Routes';
import { MaskedTextInput } from 'react-native-mask-text';
import { useSelector, useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  clearTankId,
  selectCurrentClientTank
} from '../redux/slices/forms/servicecallTankSlice';
import { StatusBar } from 'expo-status-bar';
import {
  serviceFormFieldQuestionsBoolean,
  serviceFormFieldQuestionsNumeric,
  serviceFormFieldQuestionsText,
  ServiceFormData,
  serviceFormSchema,
  defaultServiceFormValues
} from '../types/ServiceFormandData';
import {
  Text,
  SegmentedButtons,
  TextInput,
  HelperText
} from 'react-native-paper';
import React, { useRef } from 'react';
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  ERROR_COLOR,
  QUARTERNARY_COLOR
} from '../types/Styling';
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TextInput as RNTextInput,
  View
} from 'react-native';

type Props = NativeStackScreenProps<Routes, 'ServiceCallFormScreen'>;

const ServiceCallForm = ({ navigation }: Props) => {
  const [uploadServiceCall, { isLoading }] = useUploadServiceCallMutation();
  const clientTankId = useSelector(selectCurrentClientTank);
  const employeeId = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  // Used to scroll to the top of the screen when there are errors
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToPosition(0, 0, true);
    }
  };

  console.log('clientTankId: ', clientTankId);

  const { control, handleSubmit, formState, register } =
    useForm<ServiceFormData>({
      defaultValues: defaultServiceFormValues,
      resolver: zodResolver(serviceFormSchema)
    });

  const { errors } = formState;

  // Scroll to top if there are errors
  if (errors && Object.keys(errors).length > 0) scrollToTop();

  console.log('Validation Errors: ', errors);

  const onSubmit: SubmitHandler<ServiceFormData> = async (data: any) => {
    // Add employeeId, tankId, and date service call was created to data object
    const dataWithEmployeeandTankId = {
      ...data,
      employeeId: employeeId?.userId,
      tankId: clientTankId,
      createdOn: new Date().toISOString()
    };

    try {
      const response = await uploadServiceCall(
        dataWithEmployeeandTankId
      ).unwrap();
      console.log('Service Call Form Response: ', response);
      dispatch(clearTankId());
      navigation.replace(QRSCANNERSCREEN);
    } catch (err: any) {
      if (!err?.status) {
        console.log('No Server Response');
      } else {
        const errorData = JSON.parse(err.data);
        console.log(
          `Service Call Screen error ${err.status}: `,
          errorData.error.issues
        );
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
              <RNTextInput
                keyboardType='numeric'
                autoFocus={index === 0 ? true : false}
                placeholder='0'
                onBlur={onBlur}
                value={value ? value.toString() : undefined}
                onChangeText={nextValue => onChange(parseFloat(nextValue))}
                style={[styles.input, errors?.[id] && styles.errorInput]}
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
                      : { backgroundColor: QUARTERNARY_COLOR }
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
      {/* {isLoading && <LoadingSpinner />} */}
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
            disabled={isLoading}
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
