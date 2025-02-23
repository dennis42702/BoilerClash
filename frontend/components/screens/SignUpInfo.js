import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, Alert, ScrollView, Modal, TouchableOpacity } from "react-native";
import {
  TextInput,
  Button,
  Text,
  PaperProvider,
  useTheme,
  Menu,
} from "react-native-paper";
import axios from "axios";

const SignUpInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const { userId } = route.params;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // College Dropdown
  const [college, setCollege] = useState("Select College");
  const [collegeModalVisible, setCollegeModalVisible] = useState(false);

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
      Alert.alert(
        "Error",
        "User ID is missing. Please restart the signup process."
      );
      return;
    }

    // Check if required fields are filled
    if (
      !firstName ||
      !lastName ||
      college === "Select College" ||
      year === "Select Class Year" ||
      !gender
    ) {
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
        "http://10.186.187.54:5003/signup/details",
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
    dropdownWrapper: {
      width: "90%",
      alignItems: "center",
      marginBottom: 10,
    },
    dropdown: {
      width: "100%",
      justifyContent: "center",
    },
    genderContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
      width: "90%",
    },
    genderButton: {
      flex: 1,
      marginHorizontal: 5,
    },
    loginButton: {
      marginTop: 10,
      width: "100%",
      backgroundColor: colors.primary,
    },
    signUpButton: {
      marginTop: 10,
      width: "50%",
      borderWidth: 1,
      borderColor: colors.primary,
    },
  //  buttonContainer: {
  //    flexDirection: "row",
  //    justifyContent: "space-between",
  //    width: "100%",
  //  },
  //  backButton: {
  //    flex: 1,
  //    marginRight: 5,
  //  },
  //  submitButton: {
  //    flex: 1,
  //    marginLeft: 5,
  //  },
  });

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Personal Information</Text>

        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          mode="outlined"
          style={styles.input}
          activeOutlineColor= {colors.primary}
        />

        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          mode="outlined"
          style={styles.input}
          activeOutlineColor= {colors.primary}
        />

        {/* College Dropdown */}
        {/* { <View style={styles.dropdownWrapper}>
          <Menu
            visible={collegeMenuVisible}
            onDismiss={() => setCollegeMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setCollegeMenuVisible(true)}
                style={styles.dropdown}
                textColor={colors.text}
              >
                {college}
              </Button>
            }
          >
            <ScrollView style={{ maxHeight: 200 }}>
              {colleges.map((item, index) => (
                <Menu.Item key={index} onPress={() => setCollege(item)} title={item} />
              ))}
            </ScrollView>
          </Menu>
        </View> } */}

        {/* Custom Button Styled like a Paper Button */}
        <Button
          mode="outlined"
          onPress={() => setCollegeModalVisible(true)}
          style={styles.dropdownButton}
          textColor={colors.text}
        >
          {college}
        </Button>

        {/* Modal for College Selection */}
        <Modal
          visible={collegeModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setCollegeModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setCollegeModalVisible(false)}
          />
          <View style={styles.modalContent}>
            <ScrollView style={styles.scrollableDropdown}>
              {colleges.map((item, index) => (
                <Button
                  key={index}
                  mode="outlined"
                  onPress={() => {
                    setCollege(item);
                    setCollegeModalVisible(false);
                  }}
                  style={styles.modalButton}
                  textColor={colors.text}
                >
                  {item}
                </Button>
              ))}
            </ScrollView>
          </View>
        </Modal>



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
                textColor={colors.text}
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
            style={[
              styles.genderButton,
              gender === "Male" ? styles.loginButton : null,
            ]}
            textColor={colors.text}
          >
            Male
          </Button>
          <Button
            mode={gender === "Female" ? "contained" : "outlined"}
            onPress={() => setGender("Female")}
            style={[
              styles.genderButton,
              gender === "Female" ? styles.loginButton : null,
            ]}
            textColor={colors.text}
          >
            Female
          </Button>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.loginButton}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
};

export default SignUpInfo;
