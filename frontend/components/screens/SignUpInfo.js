import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, PaperProvider, Menu } from "react-native-paper";
import axios from "axios";

const SignUpInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // College Dropdown
  const [college, setCollege] = useState("Select College");
  const [collegeMenuVisible, setCollegeMenuVisible] = useState(false);

  // Class Year Dropdown
  const [year, setYear] = useState("Select Class Year");
  const [yearMenuVisible, setYearMenuVisible] = useState(false);

  // Gender Selection using Buttons
  const [gender, setGender] = useState(""); // Set default as an empty string
  const [loading, setLoading] = useState(false);

  // List of Colleges
  const colleges = [
    "College of Agriculture",
    "Daniels School of Business",
    "College of Education",
    "College of Engineering",
    "Exploratory Studies",
    "College of Health and Human Sciences",
    "College of Liberal Arts",
    "College of Pharmacy",
    "Purdue Polytechnic",
    "College of Science",
    "College of Veterinary Medicine",
  ];

  // Function to handle Sign Up Submission
  const handleSubmit = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID is missing. Please restart the signup process.");
      return;
    }

    // Check if required fields are filled
    if (!firstName || !lastName || college === "Select College" || year === "Select Class Year" || !gender) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    setLoading(true);

    // Log the request payload before making the request
    console.log("Sending request with:", {
      userId,
      firstName,
      lastName,
      college,
      year,
      gender,
    });

    try {
      const response = await axios.post(
        "http://10.186.105.111:5003/signup/details",
        {
          userId,
          firstName,
          lastName,
          college,
          year,
          gender,
        },
        {
          headers: { "Content-Type": "application/json" }, // Explicitly set headers
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("Login"); // Redirect to Login screen
        console.log("Account created successfully!");
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

        {/* College Dropdown */}
        <View style={styles.dropdownWrapper}>
          <Menu
            visible={collegeMenuVisible}
            onDismiss={() => setCollegeMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setCollegeMenuVisible(true)}
                style={styles.dropdown}
              >
                {college}
              </Button>
            }
          >
            {colleges.map((item, index) => (
              <Menu.Item key={index} onPress={() => setCollege(item)} title={item} />
            ))}
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
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.submitButton}
          >
            {loading ? "Submitting..." : "Submit"}
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
    alignItems: "center",
    marginBottom: 10,
  },
  dropdown: {
    width: "90%",
    justifyContent: "center",
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

export default SignUpInfo;
