// index.js
import React, { useEffect } from "react";
// import { AppRegistry } from "react-native";
import { registerRootComponent } from "expo";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { startLocationTracking, stopLocationTracking } from "./LocationManager";
// import Geofencing from "@rn-bridge/react-native-geofencing";

import HomeScreen from "./components/HomeScreen";
import Login from "./components/screens/Login";
import ForgotPW from "./components/screens/ForgotPW";
import SignUpId from "./components/screens/SignUpId";
import SignUpInfo from "./components/screens/SignUpInfo";

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    startLocationTracking();
    return () => {
      stopLocationTracking();
    };
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPW}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="New Account" component={SignUpId} />
          <Stack.Screen name="Personal Info" component={SignUpInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

// AppRegistry.registerComponent("main", () => App);
registerRootComponent(App);
