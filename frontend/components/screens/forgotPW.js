import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, PaperProvider } from "react-native-paper";
import axios from "axios";

const ForgotPW = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle Password Reset
  const handleResetPassword = async () => {
    if (!email || !newPassword || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://10.186.105.111:5003/reset-password", {
        email,
        newPassword,
      });

      if (response.data.success) {
        Alert.alert("Success", "Password reset successfully!");
        navigation.navigate("Login"); // Redirect to Login screen
      } else {
        Alert.alert("Reset Failed", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to the server.");
      console.error("Reset Password Error:", error);
    }

    setLoading(false);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>

        {/* Email Input Field */}
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
        />

        {/* New Password Input Field */}
        <TextInput
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />

        {/* Confirm Password Input Field */}
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />

        {/* Reset Password Button */}
        <Button
          mode="contained"
          onPress={handleResetPassword}
          loading={loading}
          disabled={loading}
          style={styles.resetButton}
        >
          {loading ? "Resetting..." : "Reset Password"}
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
  resetButton: {
    marginTop: 10,
    width: "100%",
  },
});

export default ForgotPW;
