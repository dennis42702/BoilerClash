// index.js
import React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import HomeScreen from "./components/HomeScreen"; // Ensure this path is correct
import { name as appName } from "./app.json";
import LoginScreen from "./components/screens/login";

const App = () => (
  <PaperProvider>
    <LoginScreen />
  </PaperProvider>
);

AppRegistry.registerComponent("main", () => App);
