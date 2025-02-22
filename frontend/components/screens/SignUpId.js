import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, PaperProvider } from 'react-native-paper';
import axios from 'axios';

const SignUpId = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Regular Expressions for Validation
  const usernameRegex = /^[a-zA-Z0-9]{2,10}$/;  // 2-10 letters or numbers
  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;  // Must contain exactly one '@' and a domain
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;  // 6-12 characters, at least one letter & one number

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
      Alert.alert("Error", "Password must be 6-12 characters and include at least one letter and one number.");
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
    if (!validateInput()) return;

    setLoading(true);

    try {
      const response = await axios.post("http://10.186.105.111:5003/signup", {
        username,
        email,
        password,
      });

      if (response.data.success) {
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate('SignUpStep2'); // Move to Step 2
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

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up - Step 1</Text>

        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />

        {/* Sign Up Button */}
        <Button
          mode="contained"
          onPress={handleSignUp}
          loading={loading}
          disabled={loading}
          style={styles.nextButton}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  nextButton: {
    marginTop: 10,
    width: '100%',
  },
});

export default SignUpId;
