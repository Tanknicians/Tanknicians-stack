import AnimatedLoader from 'react-native-animated-loader';
import { View, StyleSheet } from 'react-native';
import React from 'react';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <AnimatedLoader
        source={require('../../assets/loaders/loader1.json')}
        visible={true}
        overlayColor='rgba(255,255,255,0.15)'
        animationStyle={styles.lottie}
        speed={1}
        color={'#FFFFFF'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute'
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  lottie: {
    width: 175,
    height: 175
  }
});

export default LoadingScreen;
