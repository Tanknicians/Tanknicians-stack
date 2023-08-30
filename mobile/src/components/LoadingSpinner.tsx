import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { PRIMARY_COLOR } from '../types/Styling';
import React from 'react';

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={PRIMARY_COLOR} />
      <Text style={{ color: '#FFFFFF' }}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.20)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }
});

export default LoadingSpinner;
