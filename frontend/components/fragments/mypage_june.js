import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Button, Menu, PaperProvider, Avatar, DataTable } from "react-native-paper";

const ProfileFragment = () => {
  // Dropdown State
  const [timePeriod, setTimePeriod] = useState("WEEK");
  const [menuVisible, setMenuVisible] = useState(false);

  // User Data
  const userData = {
    username: "john_doe",
    name: "John Doe",
    classMajor: "Junior, Computer Science",
    profilePic: "https://source.unsplash.com/100x100/?face",
  };

  // Table Data
  const studyData = [
    { id: "1", building: "Library", hours: 15 },
    { id: "2", building: "Science Hall", hours: 12 },
    { id: "3", building: "Dorm Study Room", hours: 9 },
  ];

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <Avatar.Image size={60} source={{ uri: userData.profilePic }} />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{userData.username}</Text>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.classMajor}>{userData.classMajor}</Text>
          </View>
        </View>

        {/* Dropdown Menu for Time Selection */}
        <View style={styles.dropdownContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button mode="outlined" onPress={() => setMenuVisible(true)} style={styles.dropdown}>
                {timePeriod}
              </Button>
            }
          >
            <Menu.Item onPress={() => setTimePeriod("WEEK")} title="WEEK" />
            <Menu.Item onPress={() => setTimePeriod("MONTH")} title="MONTH" />
          </Menu>
        </View>

        {/* Study Time Table */}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Building</DataTable.Title>
            <DataTable.Title numeric>HRs</DataTable.Title>
          </DataTable.Header>

          <FlatList
            data={studyData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DataTable.Row>
                <DataTable.Cell>{item.building}</DataTable.Cell>
                <DataTable.Cell numeric>{item.hours}</DataTable.Cell>
              </DataTable.Row>
            )}
          />
        </DataTable>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userInfo: {
    marginLeft: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
    color: "gray",
  },
  classMajor: {
    fontSize: 14,
    color: "gray",
  },
  dropdownContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  dropdown: {
    width: 120,
  },
});

export default ProfileFragment;
