// index.js
import React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { registerRootComponent } from "expo"; // Add this for web support
import HomeScreen from "../components/HomeScreen";
import { name as appName } from "../app.json";

const App = () => (
  <PaperProvider>
    <HomeScreen />
  </PaperProvider>
);

// For mobile (iOS & Android)
AppRegistry.registerComponent(appName, () => App);

// For web
registerRootComponent(App);
