import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, PaperProvider } from 'react-native-paper';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [validationCode, setValidationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

        {/* Validation Code Input Field */}
        <TextInput
          label="Validation Code"
          value={validationCode}
          onChangeText={setValidationCode}
          mode="outlined"
          keyboardType="numeric"
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
          onPress={() => console.log('Reset Password Pressed')}
          style={styles.resetButton}
        >
          Reset Password
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
  resetButton: {
    marginTop: 10,
    width: '100%',
  },
});

export default ForgotPasswordScreen;
