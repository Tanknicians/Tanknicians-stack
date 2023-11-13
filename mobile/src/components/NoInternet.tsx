import { Animated, Easing, StatusBar, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    backgroundColor: 'red',
    padding: 5,
    paddingLeft: 10,
    overflow: 'hidden'
  },
  text: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'center'
  }
});

const NoInternet = () => {
  const { isConnected } = useNetInfo();
  if (isConnected) return null;
  return (
    <Animated.View style={[styles.container]}>
      <StatusBar backgroundColor='red' />
      <Text style={styles.text}>No Internet Connection</Text>
    </Animated.View>
  );
};

export default NoInternet;
