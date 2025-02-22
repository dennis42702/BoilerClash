// index.js
import React, { useEffect, useState } from "react";
// import { AppRegistry } from "react-native";
import { registerRootComponent } from "expo";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { startLocationTracking, stopLocationTracking } from "./LocationManager";
import { Text } from "react-native-paper";

import HomeScreen from "./components/HomeScreen";
import Login from "./components/screens/Login";
import ForgotPW from "./components/screens/ForgotPW";
import SignUpId from "./components/screens/SignUpId";
import SignUpInfo from "./components/screens/SignUpInfo";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("email");
        setIsLoggedIn(!!storedUserId);
        console.log("Login status checked:", !!storedUserId);
      } catch (error) {
        console.error("Something error");
      }
    };
    checkLoginStatus();

    startLocationTracking();
    return () => {
      stopLocationTracking();
    };
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={login} />
          <Stack.Screen name="ForgotPassword" component={forgotPW} />
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
