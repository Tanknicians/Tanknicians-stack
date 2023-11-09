import { useUploadServiceCallMutation } from '../redux/slices/forms/servicecallApiSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, SubmitHandler } from 'react-hook-form';
import { selectCurrentUser } from '../redux/slices/auth/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  QRSCANNERSCREEN,
  SERVICECALLFORMSCREEN,
  Routes
} from '../types/Routes';
import { useSelector, useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  clearTankId,
  selectCurrentClientTank
} from '../redux/slices/forms/servicecallTankSlice';
import { StatusBar } from 'expo-status-bar';
import {
  ServiceFormData,
  serviceFormSchema,
  defaultServiceFormValues
} from '../types/zodTypes';
import {
  Text,
  Button,
  Portal,
  Modal,
  ProgressBar,
  MD3Colors,
  ActivityIndicator
} from 'react-native-paper';
import React, { useRef, useState } from 'react';
import { PRIMARY_COLOR, TERTIARY_COLOR } from '../types/Styling';
import { Keyboard, Platform, TouchableOpacity, View } from 'react-native';
import styles from '../styles/servicecall';
import Icon from 'react-native-vector-icons/FontAwesome';
import ServiceCallFormQuestions from '../components/ServiceCallFormQuestions';
import NoInternet from '../components/NoInternet';
import { storeServiceCallOfflineData } from '../redux/slices/forms/servicecallOffline';

type Props = NativeStackScreenProps<Routes, typeof SERVICECALLFORMSCREEN>;

const ServiceCallForm = ({ navigation }: Props) => {
  const [uploadServiceCall, { isLoading }] = useUploadServiceCallMutation();
  const clientTankId = useSelector(selectCurrentClientTank);
  const employeeId = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  // Used to scroll to the top of the screen when there are errors
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const { control, handleSubmit, formState } = useForm<ServiceFormData>({
    defaultValues: defaultServiceFormValues,
    resolver: zodResolver(serviceFormSchema)
  });

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToPosition(0, 0, true);
    }
  };
  const { errors } = formState;

  // Scroll to top if there are errors
  if (errors && Object.keys(errors).length > 0) scrollToTop();

  const onSubmit: SubmitHandler<ServiceFormData> = async (data) => {
    // Add employeeId, tankId, and date service call was created to data object
    const dataWithEmployeeandTankId = {
      ...data,
      employeeId: employeeId?.userId,
      tankId: clientTankId,
      createdOn: new Date()
    };

    // If there is no internet connection, do not attempt to upload service call
    // store service call in local storage
    if (isConnected) {
      console.log('No Internet Connection');
      await storeServiceCallOfflineData(dataWithEmployeeandTankId);
      dispatch(clearTankId());

      // display modal for 3 seconds
      showModal();
      return;
    }

    try {
      const response = await uploadServiceCall(
        dataWithEmployeeandTankId
      ).unwrap();
      console.log('Service Call Form Response: ', response);
      dispatch(clearTankId());
      showModal();
    } catch (error) {
      console.log('Service Call Form Error: ', error);
    }
  };

  // Set timeout to navigate to QR Scanner Screen after a time delay of modal being visible
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
    Keyboard.dismiss();

    const delayTime = 2500;
    setTimeout(() => {
      setVisible(false);
      navigation.replace(QRSCANNERSCREEN);
    }, delayTime);
  };

  const modalErrorText = 'Form Will Submit When Connected To Internet\n';
  const modalSuccessText = 'Form Submitted Successfully\n';

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Portal>
          <Modal
            visible={visible}
            dismissable={false}
            contentContainerStyle={styles.responseModalContainer}
          >
            <Text variant='headlineMedium' style={styles.responseModalHeader}>
              {!isConnected ? modalSuccessText : modalErrorText}
              <Text variant='titleLarge' style={styles.responseModalText}>
                Navigating to QR Scanner...
              </Text>
            </Text>
            <ActivityIndicator
              size='large'
              animating={true}
              color={PRIMARY_COLOR}
            />
          </Modal>
        </Portal>
        <StatusBar style='light' />
        <View style={styles.headerContainer}>
          {/* {isConnected && <NoInternet />} */}
          <Button
            icon={() => (
              <Icon name='chevron-left' size={26} color={TERTIARY_COLOR} />
            )}
            onPress={() => navigation.replace(QRSCANNERSCREEN)}
            rippleColor='transparent'
            children={undefined}
          />
          <Text style={styles.header}>Service Call Form</Text>
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
          <ServiceCallFormQuestions control={control} />
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
    </>
  );
};

export default ServiceCallForm;
