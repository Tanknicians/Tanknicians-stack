import { Animated, Easing, StatusBar, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

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
  // Fade animation for the no internet connection banner
  const [fadeAnim] = useState(new Animated.Value(0));

  // useEffect(() => {
  //   Animated.parallel([
  //     // Fade-in animation
  //     Animated.timing(fadeAnim, {
  //       toValue: 1,
  //       duration: 1000,
  //       easing: Easing.ease,
  //       useNativeDriver: false
  //     }),
  //     // Vertical growth animation
  //     Animated.timing(fadeAnim, {
  //       toValue: 40, // Adjust to the desired final height
  //       duration: 1000,
  //       easing: Easing.ease,
  //       useNativeDriver: false
  //     })
  //   ]).start();

  //   return () => {
  //     Animated.parallel([
  //       // Fade-out animation
  //       Animated.timing(fadeAnim, {
  //         toValue: 0,
  //         duration: 1000,
  //         easing: Easing.ease,
  //         useNativeDriver: false
  //       }),
  //       // Vertical shrink animation
  //       Animated.timing(fadeAnim, {
  //         toValue: 0, // Set to 0 to hide the container
  //         duration: 1000,
  //         easing: Easing.ease,
  //         useNativeDriver: false
  //       })
  //     ]).start();
  //   };
  // }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container]}>
      <StatusBar backgroundColor='red' />
      <Text style={styles.text}>No Internet Connection</Text>
    </Animated.View>
  );
};

export default NoInternet;
