import { useUploadServiceCallMutation } from '../redux/slices/forms/servicecallApiSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, SubmitHandler } from 'react-hook-form';
import { selectCurrentUser } from '../redux/slices/auth/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  MobileServiceCallQuestions,
  CreateServiceCall,
  mobileServiceCallQuestions
} from '../types/zodTypes';
import {
  Text,
  Button,
  Portal,
  Modal,
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
import { useNetInfo } from '@react-native-community/netinfo';
import { defaultValues } from '../components/ServiceCallFormQuestions';

type Props = NativeStackScreenProps<Routes, typeof SERVICECALLFORMSCREEN>;

const ServiceCallForm = ({ navigation }: Props) => {
  const [uploadServiceCall, { isLoading }] = useUploadServiceCallMutation();
  const { isConnected } = useNetInfo();
  const dispatch = useDispatch();

  // Get tankId and employeeId from redux store to add to service call form data
  const clientTankId = useSelector(selectCurrentClientTank);
  const loggedInUser = useSelector(selectCurrentUser);

  // Used to scroll to the top of the screen when there are errors
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const { control, handleSubmit, formState } =
    useForm<MobileServiceCallQuestions>({
      defaultValues,
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      resolver: zodResolver(mobileServiceCallQuestions)
    });
  const { errors } = formState;
  console.log('Service Call Form Errors: ', errors);

  // Scroll to top of screen when there are errors
  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToPosition(0, 0, true);
    }
  };
  if (errors && Object.keys(errors).length > 0) scrollToTop();

  const onValid: SubmitHandler<MobileServiceCallQuestions> = async (
    data: MobileServiceCallQuestions
  ) => {
    // Add employeeId, tankId, and date service call was created to data object
    const dataWithEmployeeandTankId: CreateServiceCall = {
      ...data,
      employeeId: loggedInUser.userId,
      tankId: clientTankId,
      createdOn: new Date()
    };

    // If there is no internet connection, do not attempt to upload service call
    // store service call in local storage
    if (!isConnected) {
      console.log('No Internet Connection');
      await storeServiceCallOfflineData(dataWithEmployeeandTankId);

      // display modal prompt to user that form will submit when connected to internet
      showModal(false);
      return;
    }

    // ! Make sure to start ngrok before testing this functionality
    // ! SyntaxError when trying to upload service call
    try {
      const response = await uploadServiceCall(
        dataWithEmployeeandTankId
      ).unwrap();
      console.log('Service Call Form Response: ', response);
      dispatch(clearTankId());
      showModal(true);
    } catch (error) {
      console.log('Service Call Form Error: ', error);
    }
  };

  // Set timeout to navigate to QR Scanner Screen after a time delay of modal being visible
  const [isSuccess, setIsSuccess] = useState(false);

  // isConnected will determine how long the modal is visible for
  const showModal = (isConnected: boolean) => {
    setIsSuccess(true);
    Keyboard.dismiss();

    const onlineDelayTime = 2500;
    const offlineDelayTime = 3500;

    setTimeout(
      () => {
        setIsSuccess(false);
        dispatch(clearTankId());
        navigation.replace(QRSCANNERSCREEN);
      },
      isConnected ? onlineDelayTime : offlineDelayTime
    );
  };

  // Text to display in modal when form is submitted
  // isConnected will determine the text displayed
  // isLoading from api call and isVisible when api call is complete will determine if modal is visible
  const modalErrorText = 'Form Will Submit When Connected To Internet\n';
  const modalSuccessText = 'Form Submitted Successfully\n';
  const isShowingModal = isLoading || isSuccess;

  return (
    <SafeAreaView style={styles.container}>
      {isShowingModal && (
        <Portal>
          <Modal
            visible={isShowingModal}
            dismissable={false}
            contentContainerStyle={styles.responseModalContainer}
          >
            <ActivityIndicator
              size='large'
              animating={true}
              color={PRIMARY_COLOR}
            />
            {isSuccess && (
              <Text variant='headlineMedium' style={styles.responseModalHeader}>
                {isConnected ? modalSuccessText : modalErrorText}
                <Text variant='titleLarge' style={styles.responseModalText}>
                  Navigating to QR Scanner...
                </Text>
              </Text>
            )}
          </Modal>
        </Portal>
      )}
      <StatusBar style='light' />
      {!isConnected && <NoInternet />}
      <View style={styles.headerContainer}>
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
            onPress={handleSubmit(onValid)}
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
