import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './src/pages/Login';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// type of App is a React Functional Component with argument of type 'Props'
const App = () => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <LoginPage/>
      </View>
    </PaperProvider>
  );
}

export default App;

