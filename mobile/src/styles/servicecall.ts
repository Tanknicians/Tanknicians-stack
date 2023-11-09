import { StyleSheet } from 'react-native';
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR
} from '../types/Styling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    paddingBottom: 30
  },
  keyboardAwareContainer: {
    flex: 1,
    backgroundColor: TERTIARY_COLOR,
    width: '100%',
    borderWidth: 1,
    borderRadius: 4
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  header: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 32,
    color: TERTIARY_COLOR,
    marginTop: 15,
    marginBottom: 15
  },
  input: {
    marginVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: SECONDARY_COLOR,
    fontSize: 18
  },
  inputoutline: {
    borderWidth: 2
  },
  inputView: {
    marginBottom: 5
  },
  label: {
    fontSize: 16
  },
  segmentedButtons: { marginTop: 8, marginBottom: 20 },
  keyboardAwareContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingBottom: 20
  },
  submitButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitButton: {
    width: '80%',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40
  },
  submitButtonText: {
    color: TERTIARY_COLOR,
    fontSize: 20
  },
  responseModalContainer: {
    backgroundColor: 'white',
    padding: 10,
    paddingVertical: 12,
    margin: 12,
    borderRadius: 5,
    borderWidth: 1.5
  },
  responseModalHeader: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  responseModalText: {
    textAlign: 'center',
    color: SECONDARY_COLOR
  }
});

export default styles;
