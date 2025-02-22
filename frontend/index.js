// index.js
import React, { useEffect, useState } from "react";
import { AppRegistry, View, Text, Button, BackHandler } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import LoginScreen from "./components/screens/login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./components/HomeScreen";
import { name as appName } from "./app.json";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsLoggedIn(!!token);
      setIsLoading(false);
    };
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Hello</Text>
    </View>
    // <PaperProvider>
    //   <NavigationContainer>
    //     <Stack.Navigator initialRouteName="Login">
    //       <Stack.Screen name="Login" component={LoginScreen} />
    //       <Stack.Screen name="Home" component={HomeScreen} />
    //       {/* Register Home screen properly */}
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </PaperProvider>
  );
};

AppRegistry.registerComponent("main", () => App);
