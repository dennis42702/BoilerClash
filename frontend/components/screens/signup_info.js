import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Text,
  PaperProvider,
  Menu,
} from "react-native-paper";

const SignUpStep2 = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Major Dropdown
  const [major, setMajor] = useState("Major");
  const [majorMenuVisible, setMajorMenuVisible] = useState(false);

  // Class Year Dropdown
  const [year, setYear] = useState("Class Year");
  const [yearMenuVisible, setYearMenuVisible] = useState(false);

  // Gender Selection using Buttons
  const [gender, setGender] = useState(null);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up - Step 2</Text>

        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          mode="outlined"
          style={styles.input}
        />

        {/* Major Dropdown */}
        <View style={styles.dropdownWrapper}>
          <Menu
            visible={majorMenuVisible}
            onDismiss={() => setMajorMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setMajorMenuVisible(true)}
                style={styles.dropdown}
              >
                {major}
              </Button>
            }
          >
            <Menu.Item
              onPress={() => setMajor("Computer Science")}
              title="Computer Science"
            />
            <Menu.Item
              onPress={() => setMajor("Industrial Engineering")}
              title="Industrial Engineering"
            />
            <Menu.Item onPress={() => setMajor("Business")} title="Business" />
          </Menu>
        </View>

        {/* Class Year Dropdown */}
        <View style={styles.dropdownWrapper}>
          <Menu
            visible={yearMenuVisible}
            onDismiss={() => setYearMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setYearMenuVisible(true)}
                style={styles.dropdown}
              >
                {year}
              </Button>
            }
          >
            <Menu.Item onPress={() => setYear("Freshman")} title="Freshman" />
            <Menu.Item onPress={() => setYear("Sophomore")} title="Sophomore" />
            <Menu.Item onPress={() => setYear("Junior")} title="Junior" />
            <Menu.Item onPress={() => setYear("Senior")} title="Senior" />
          </Menu>
        </View>

        {/* Gender Selection Buttons */}
        <View style={styles.genderContainer}>
          <Button
            mode={gender === "Male" ? "contained" : "outlined"}
            onPress={() => setGender("Male")}
            style={styles.genderButton}
          >
            Male
          </Button>
          <Button
            mode={gender === "Female" ? "contained" : "outlined"}
            onPress={() => setGender("Female")}
            style={styles.genderButton}
          >
            Female
          </Button>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            Back
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Login")}
            style={styles.submitButton}
          >
            Submit
          </Button>
        </View>
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
  dropdownWrapper: {
    width: "100%",
    alignItems: "center", // Centers the dropdown button
    marginBottom: 10,
  },
  dropdown: {
    width: "90%", // Adjust width for better alignment
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  genderButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  backButton: {
    flex: 1,
    marginRight: 5,
  },
  submitButton: {
    flex: 1,
    marginLeft: 5,
  },
});

export default SignUpStep2;
