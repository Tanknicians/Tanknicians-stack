import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { PRIMARY_COLOR } from '../types/Styling';
import React from 'react';

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={PRIMARY_COLOR} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.40)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 10
  }
});

export default LoadingSpinner;
