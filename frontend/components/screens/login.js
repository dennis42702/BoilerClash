import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log("Login Pressed");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* ID Input Field */}
      <TextInput
        label="ID"
        value={id}
        onChangeText={(text) => setId(text)}
        mode="outlined"
        style={styles.input}
      />

      {/* Password Input Field */}
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
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
      <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>
        Login
      </Button>
    </View>
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
});

export default LoginScreen;
