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

  // Function to handle Sign Up
  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

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
