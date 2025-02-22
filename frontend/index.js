// index.js
import React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import HomeScreen from "./components/HomeScreen"; // Ensure this path is correct
import { name as appName } from "./app.json";
import LoginScreen from "./components/screens/login";
import ForgotPasswordScreen from "./components/screens/forgotPW";
import SignUpStep1 from "./components/screens/signup_id";
import SignUpStep2 from "./components/screens/signup_info";
const App = () => (
  <PaperProvider>
    <SignUpStep2 />
  </PaperProvider>
);

AppRegistry.registerComponent("main", () => App);
