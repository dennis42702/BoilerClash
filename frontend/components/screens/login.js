import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  TextInput,
  Button,
  Text,
  PaperProvider,
  useTheme,
  IconButton,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../CONST";

const Login = () => {
  const navigation = useNavigation();

  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // console.log("Login button pressed");
    // const userId = "1";
    // navigation.replace("HomeScreen", { userId }); // Navigate to Home Screen

    // setLoading(false);
    // console.log("Login button pressed");
    // return;
    if (!email || !password) {
      Alert.alert("Error", "Please enter both Email and Password.");
      return;
    }

    setLoading(true);

    try {
      // #TODO: Save
      // await AsyncStorage.setItem("email", email, () =>
      //   console.log("email saved")
      // );
      // navigation.navigate("HomeScreen");
      // return;

      const response = await axios.post(
        `${API_URL}/login`,
        {
          email: email,
          password: password,
        },
        {
          validateStatus: (status) => status < 500,
        }
      );

      if (response.data.success) {
        const userId = response.data.userId;
        console.log(userId);
        Alert.alert("Success", "Login successful!");
        //await AsyncStorage.setItem("email", email, () =>
        // console.log("email saved")
        //);
        navigation.replace("HomeScreen", { userId }); // Navigate to Home Screen
      } else {
        Alert.alert("Login Failed", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
      console.error("Login Error:", error);
    }

    setLoading(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: colors.text,
    },
    input: {
      width: "100%",
      marginBottom: 10,
      backgroundColor: colors.surface,
      color: colors.text,
    },
    loginButton: {
      marginTop: 10,
      width: "100%",
      backgroundColor: colors.primary,
    },
    signUpButton: {
      marginTop: 10,
      width: "100%",
      borderWidth: 1,
      borderColor: colors.primary,
    },
  });

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        {/* Email Input Field */}
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          activeOutlineColor={colors.primary}
        />

        {/* Password Input Field */}
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry={!showPassword}
          style={styles.input}
          activeOutlineColor={colors.primary}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        {/* Forgot Password Button */}
        <Button
          mode="text"
          onPress={() => console.log("Forgot Password Pressed")}
          textColor={colors.text}
        >
          Forgot Password?
        </Button>

        {/* Login Button */}
        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          // disabled={loading}
          style={styles.loginButton}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* Sign Up Button */}
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("SignUpId")}
          style={styles.signUpButton}
          textColor={colors.text}
        >
          Sign Up
        </Button>
      </View>
    </PaperProvider>
  );
};

export default Login;
