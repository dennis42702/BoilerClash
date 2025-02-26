import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Dialog,
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
import ToggleButtonInterval from "../subcomponents/ToggleButtonInterval";
import axios from "axios";
import { API_URL } from "../../CONST";

const leaderboardData = {
  leaderboard: [
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
  ],
};

const availableBuildings = [
  "WALC",
  "HICKS",
  "HAAS",
  "DUDL",
  "LMBS",
  "LWSN",
  "LILY",
  "KRCH",
  "CREC",
  "STEW",
  "KRAN",
  "RAWL",
];

const LeaderboardFragment = ({
  weeklyIndividualLeaderboard,
  monthlyIndividualLeaderboard,
}) => {
  if (!weeklyIndividualLeaderboard) {
    weeklyIndividualLeaderboard = leaderboardData;
  }
  if (!monthlyIndividualLeaderboard) {
    monthlyIndividualLeaderboard = leaderboardData;
  }

  const { colors } = useTheme();

  const [data, setData] = useState(weeklyIndividualLeaderboard.leaderboard);

  // Dropdown State
  const [category, setCategory] = useState("TOTAL");
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);

  const [viewType, setViewType] = useState("INDIVIDUAL");
  const [viewTypeMenuVisible, setViewTypeMenuVisible] = useState(false);

  // Weekly / Monthly Toggle State
  const [timeFrame, setTimeFrame] = useState("WEEKLY");

  // Building Selection State
  const [building, setBuilding] = useState("WALC");
  const [buildingMenuVisible, setBuildingMenuVisible] = useState(false);

  useEffect(() => {
    const updateData = async () => {
      let monthlyResponse;
      let monthlyLeaderboard;
      if (viewType === "INDIVIDUAL") {
        monthlyResponse = await axios.post(
          `${API_URL}/buildingLeaderboard/individual/monthly`,
          { buildingName: building },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("RESPONSE4", monthlyResponse.data);
        monthlyLeaderboard = monthlyResponse.data.leaderboardByBuilding;
      } else {
        monthlyResponse = await axios.post(
          `${API_URL}/buildingLeaderboard/college/monthly`,
          { buildingName: building },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("RESPONSE3", monthlyResponse.data);
        monthlyLeaderboard = monthlyResponse.data.leaderboardByCollege;
      }
      let weeklyResponse;
      let weeklyLeaderboard;
      if (viewType === "INDIVIDUAL") {
        weeklyResponse = await axios.post(
          `${API_URL}/buildingLeaderboard/individual/weekly`,
          { buildingName: building },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("RESPONSE2", weeklyResponse.data);
        weeklyLeaderboard = weeklyResponse.data.leaderboardByBuilding;
      } else {
        weeklyResponse = await axios.post(
          `${API_URL}/buildingLeaderboard/college/weekly`,
          { buildingName: building },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("RESPONSE1", weeklyResponse.data);
        weeklyLeaderboard = weeklyResponse.data.leaderboardByCollege;
      }

      console.log("Fetched Weekly Data:", weeklyLeaderboard);
      console.log("Fetched Monthly Data:", monthlyLeaderboard);

      if (category === "BUILDING") {
        console.log("THATHATHAT");
        if (timeFrame === "WEEKLY") {
          const rankedData = weeklyLeaderboard.map((item, index) => ({
            ...item,
            rank: index + 1, // Assign rank based on index
          }));
          setData(rankedData);
          console.log("Updated Weekly Building Data", rankedData);
        }
        if (timeFrame === "MONTHLY") {
          const rankedData = monthlyLeaderboard.map((item, index) => ({
            ...item,
            rank: index + 1, // Assign rank based on index
          }));
          setData(rankedData);
          console.log("Updated Monthly Building Data", rankedData);
        }
      }
    };

    updateData();

    if (category === "TOTAL") {
      if (timeFrame === "WEEKLY") {
        console.log("THISTHISTHISTHIS");
        setData(weeklyIndividualLeaderboard.leaderboard);
      } else {
        setData(monthlyIndividualLeaderboard.leaderboard);
      }
    }
  }, [building, category, timeFrame]);

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
              <Text style={styles.major}>{item.college}</Text>
            </View>
            <Text style={styles.hr}>
              {category === "TOTAL"
                ? timeFrame === "MONTHLY"
                  ? Math.round(item.monthlyStudyHours * 60)
                  : Math.round(item.weeklyStudyHours * 60)
                : Math.round(item.totalDuration * 60)}
            </Text>
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

        <ToggleButtonInterval onPress={(interval) => setInterval(interval)} />

        {/* Right Dropdown */}
        <ToggleButtonGroup onPress={(viewType) => setViewType(viewType)} />
      </View>

      {/* Conditionally Render Building Dropdown */}
      {category === "BUILDING" && (
        <View style={styles.buildingDropdownContainer}>
          <Menu
            visible={buildingMenuVisible}
            onDismiss={() => setBuildingMenuVisible(false)}
            anchor={
              <Button
                onPress={() => setBuildingMenuVisible(true)}
                mode="outlined"
                style={styles.dropdownButton}
                textColor={colors.text}
              >
                {building}
              </Button>
            }
          >
            {availableBuildings.map((buildingName) => (
              <Menu.Item
                key={buildingName}
                onPress={() => {
                  setBuilding(buildingName);
                  setBuildingMenuVisible(false);
                }}
                title={buildingName}
              />
            ))}
          </Menu>
        </View>
      )}
      {/* Leaderboard List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.rank.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default LeaderboardFragment;
