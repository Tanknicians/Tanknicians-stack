import { SECONDARY_COLOR, TERTIARY_COLOR } from '../types/Styling';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    paddingTop: 20,
    paddingBottom: 30
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
    alignItems: 'center',
    position: 'relative'
  },
  scanner: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  overlay: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 60,
    marginBottom: '10%',
    padding: 16
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
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    backgroundColor: SECONDARY_COLOR
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
