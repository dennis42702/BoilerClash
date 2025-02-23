import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, PaperProvider, useTheme } from "react-native-paper";
import axios from "axios";

const SignUpId = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Regular Expressions for Validation
  const usernameRegex = /^[a-zA-Z0-9]{2,10}$/; // 2-10 letters or numbers
  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/; // Must contain exactly one '@' and a domain
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/; // 6-12 characters, at least one letter & one number

  // Function to validate user input
  const validateInput = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return false;
    }
    if (!usernameRegex.test(username)) {
      Alert.alert("Error", "Username must be 2-10 letters or numbers.");
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Invalid email format.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Error",
        "Password must be 6-12 characters and include at least one letter and one number."
      );
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return false;
    }
    return true;
  };

  // Function to handle Sign Up
  const handleSignUp = async () => {
    if (!validateInput()) {
      return; // Stop execution if validation fails
    }

    if (!username || !email || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://10.186.187.54:5003/signup", {
        username,
        email,
        password,
      });

      if (response.data.success) {
        const userId = response.data.userId;
        if (!userId) {
          Alert.alert("Error", "Failed to retrieve user ID. Please try again.");
          return;
        }
        navigation.navigate("SignUpInfo", { userId });
        console.log("Sign Up Success:", response.data);
      } else {
        Alert.alert("Sign Up Failed", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to the server.");
      console.error("Sign Up Error:", error);
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
        <Text style={styles.title}>Account Setup</Text>

        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={colors.primary}
        />

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          activateOutlineColor={colors.primary}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          activeOutlineColor={colors.primary}
        />

        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          activeOutlineColor={colors.primary}
        />

        {/* Sign Up Button */}
        <Button
          mode="contained"
          onPress={handleSignUp}
          loading={loading}
          //disabled={loading}
          style={styles.loginButton}
        >
          {loading ? "Signing Up..." : "Sign Up"}
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
    backgroundColor: "white",
  },
  nextButton: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "blue",
  },
});

export default SignUpId;
