import {
  ERROR_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
} from "../types/Styling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: SECONDARY_COLOR,
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: TERTIARY_COLOR,
    marginTop: 14,
    marginBottom: 18,
    paddingBottom: 8,
  },
  errorInput: {
    borderColor: ERROR_COLOR,
    borderWidth: 3,
  },
  errorText: {
    color: ERROR_COLOR,
    fontSize: 16,
    marginTop: 4,
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: TERTIARY_COLOR,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  keyboardAwareContainer: {
    flex: 1,
  },
  keyboardAwareContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: TERTIARY_COLOR,
    fontSize: 16,
  },
  inputView: {
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
  },
  submitButton: {
    width: "80%",
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  submitButtonText: {
    color: TERTIARY_COLOR,
    fontSize: 20,
  },
});

export default styles;
