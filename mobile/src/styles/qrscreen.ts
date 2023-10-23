import { SECONDARY_COLOR, TERTIARY_COLOR } from '../types/Styling';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  ioscontainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    paddingTop: 20,
    paddingBottom: 30
  },
  androidcontainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  barcodeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scanner: {
    ...StyleSheet.absoluteFillObject
  },
  iosoverlay: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 80,
    zIndex: 5
  },
  androidoverlay: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40,
    zIndex: 5
  },
  flipButton: {
    backgroundColor: 'transparent',
    padding: 10
  },
  flipButtonText: {
    fontSize: 18,
    margin: 5,
    color: 'white'
  },
  promptText: {
    fontSize: 18,
    color: TERTIARY_COLOR,
    textAlign: 'center'
  },
  iosHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    backgroundColor: SECONDARY_COLOR
  },
  androidHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'transparent',
    marginTop: 45
  },
  header: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 34,
    color: TERTIARY_COLOR,
    paddingBottom: 15
  }
});

export default styles;
