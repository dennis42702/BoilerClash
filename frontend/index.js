// index.js
import React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/screens/login";
import ForgotPasswordScreen from "./components/screens/forgotPW";
import SignUpStep1 from "./components/screens/signup_id";
import SignUpStep2 from "./components/screens/signup_info";

const Stack = createNativeStackNavigator();

const App = () => (
  <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUpStep1" component={SignUpStep1} />
        <Stack.Screen name="SignUpStep2" component={SignUpStep2} />
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
);

AppRegistry.registerComponent("main", () => App);
