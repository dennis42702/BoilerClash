import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, PaperProvider } from "react-native-paper";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both Email and Password.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post("http://10.186.105.111:5003/login", { 
        email: email, 
        password: password 
      });
  
      if (response.data === "Success") {
        Alert.alert("Success", "Login successful!");
        navigation.navigate("Home"); // Navigate to Home Screen
      } else {
        Alert.alert("Login Failed", response.data);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to the server.");
      console.error("Login Error:", error);
    }
  
    setLoading(false);
  };
  

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
        />

        {/* Password Input Field */}
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />

        {/* Forgot Password Button */}
        <Button
          mode="text"
          onPress={() => console.log("Forgot Password Pressed")}
        >
          Forgot Password?
        </Button>

        {/* Login Button */}
        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          style={styles.loginButton}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* Sign Up Button */}
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("SignUpStep1")}
          style={styles.signUpButton}
        >
          Sign Up
        </Button>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 10,
    width: "100%",
  },
  signUpButton: {
    marginTop: 10,
    width: "100%",
    borderColor: "blue",
    borderWidth: 1,
  },
});

export default LoginScreen;
