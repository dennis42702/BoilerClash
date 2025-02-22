import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Text,
  Button,
  Menu,
  PaperProvider,
  Avatar,
  Card,
  useTheme,
  SegmentedButtons,
} from "react-native-paper";
import ToggleButtonGroup from "../subcomponents/ToggleButtonGroup";
import ToggleButtonCategories from "../subcomponents/ToggleButtonCategories";

const LeaderboardFragment = () => {
  const { colors } = useTheme();

  // Dropdown State
  const [category, setCategory] = useState("TOTAL");
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);

  const [viewType, setViewType] = useState("INDIVIDUAL");
  const [viewTypeMenuVisible, setViewTypeMenuVisible] = useState(false);

  // Sample Leaderboard Data
  const leaderboardData = [
    { rank: 1, username: "gustavo", major: "Computer Science", hr: 15628 },
    { rank: 2, username: "tianyi", major: "Industrial Engineering", hr: 12876 },
    { rank: 3, username: "jacob", major: "Business", hr: 10887 },
    { rank: 4, username: "karius", major: "Computer Science", hr: 9827 },
    { rank: 5, username: "segyul", major: "Industrial Engineering", hr: 9655 },
    { rank: 6, username: "dennis", major: "Business", hr: 8876 },
    { rank: 7, username: "june", major: "Computer Science", hr: 8450 },
    { rank: 8, username: "joshua", major: "Industrial Engineering", hr: 8000 },
    { rank: 9, username: "brian", major: "Business", hr: 7500 },
    { rank: 10, username: "popping", major: "Computer Science", hr: 7200 },
    {
      rank: 11,
      username: "kendrick",
      major: "Industrial Engineering",
      hr: 6900,
    },
  ];

  // Renders each leaderboard entry
  const renderItem = ({ item }) => {
    const getRankColor = (rank) => {
      switch (rank) {
        case 1:
          return "#B8860B"; // Gold
        case 2:
          return "#A9A9A9"; // Silver
        case 3:
          return "#8B4513"; // Bronze
        default:
          return colors.text; // Default black color from theme
      }
    };

    return (
      <>
        <Card mode="contained" style={styles.card}>
          <View style={styles.row}>
            <Text style={[styles.rank, { color: getRankColor(item.rank) }]}>
              {item.rank}
            </Text>
            <View style={styles.info}>
              {viewType === "INDIVIDUAL" && (
                <Text style={styles.username}>{item.username}</Text>
              )}
              <Text style={styles.major}>{item.major}</Text>
            </View>
            <Text style={styles.hr}>{item.hr}</Text>
          </View>
        </Card>
        <View style={styles.separator} />
      </>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      paddingBottom: 0,
      backgroundColor: colors.surface,
    },
    dropdownContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    dropdown: {
      width: 150,
      alignSelf: "center",
    },
    card: {
      backgroundColor: colors.surface,
      borderWidth: 0,
      shadowRadius: 0,
      borderRadius: 0,
      padding: 10,
      marginVertical: 5,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    rank: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.accent,
      marginRight: 10,
    },
    info: {
      flex: 1,
      marginLeft: 10,
    },
    username: {
      fontSize: 18,
      color: colors.text,
      fontWeight: "bold",
    },
    major: {
      fontSize: 14,
      color: colors.text,
    },
    hr: {
      fontSize: 18,
      color: colors.text,
      fontWeight: "bold",
    },
    separator: {
      height: 1,
      backgroundColor: "#E0E0E0", // Light grey separator color
      marginVertical: 5,
    },
    segmentedButtons: {
      borderColor: "#B8860B", // Darker gold for border
      backgroundColor: "white", // Light background for better contrast
    },
    smallButton: {
      height: 30, // Smaller button height
      paddingVertical: 2, // Reduce padding
      minWidth: 50, // Minimum width for smaller buttons
    },
    smallLabel: {
      fontSize: 10, // Smaller font size
    },
  });

  return (
    <View style={styles.container}>
      {/* Dropdown Menus */}
      <View style={styles.dropdownContainer}>
        <ToggleButtonCategories onPress={(category) => setCategory(category)} />

        {/* Right Dropdown */}
        <ToggleButtonGroup onPress={(viewType) => setViewType(viewType)} />
      </View>

      {/* Leaderboard List */}
      <FlatList
        data={leaderboardData}
        keyExtractor={(item) => item.rank.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default LeaderboardFragment;
