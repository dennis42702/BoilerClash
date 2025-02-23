// HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  BottomNavigation,
  Portal,
  Dialog,
  Text,
  Paragraph,
  Button,
  useTheme,
} from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, BackHandler, Alert } from "react-native";
import LeaderboardFragment from "./fragments/LeaderboardFragment";
import MapFragment from "./fragments/MapFragment";
import ProfileFragment from "./fragments/ProfileFragment";
import axios from "axios";

const MapRoute = () => <MapFragment />;

const ProfileRoute = () => <ProfileFragment />;

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  const [weeklyIndividualLeaderboard, setWeeklyIndividualLeaderboard] =
    useState([]);
  const [monthlyIndividualLeaderboard, setMonthlyIndividualLeaderboard] =
    useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [visible, setVisible] = useState(false);

  // Show dialog
  const showDialog = () => setVisible(true);

  // Hide dialog
  const hideDialog = () => setVisible(false);

  const { colors } = useTheme();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "leaderboard",
      title: "Leaderboard",
      focusedIcon: "podium",
    },
    { key: "map", title: "Map", focusedIcon: "map" },
    {
      key: "profile",
      title: "My Page",
      focusedIcon: "clipboard-account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    leaderboard: () => (
      <LeaderboardFragment
        weeklyIndividualLeaderboard={weeklyIndividualLeaderboard}
        monthlyIndividualLeaderboard={monthlyIndividualLeaderboard}
      />
    ),
    map: MapRoute,
    profile: () => <ProfileFragment userId={userId} />,
  });

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#1E1E50", // Optional: Set a background color
      paddingTop: 23,
    },
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
    },
  });

  const fetchWeeklyIndividualLeaderboard = async () => {
    try {
      const response = await axios.get(
        "http://10.186.187.54:5003/individualLeaderboard/weekly"
      );
      setWeeklyIndividualLeaderboard(response.data);
      console.log("Weekly Individual Leaderboard:", response.data);
    } catch (error) {
      console.log("SOMETHING BAD HAPPENED IN WEEKLY", error);
    }
  };

  const fetchMonthlyIndividualLeaderboard = async () => {
    try {
      const response = await axios.get(
        "http://10.186.187.54:5003/individualLeaderboard/monthly"
      );
      setMonthlyIndividualLeaderboard(response.data);
      console.log("Monthly Individual Leaderboard:", response.data);
    } catch (error) {
      console.log("SOMETHING BAD HAPPENED IN MONTHLY", error);
    }
  };

  useEffect(() => {
    fetchWeeklyIndividualLeaderboard();
    fetchMonthlyIndividualLeaderboard();

    const backAction = () => {
      showDialog();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  // Exit the app
  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: colors.white }}
        activeIndicatorStyle={{ backgroundColor: colors.light_grey }}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Exit App</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to exit the app?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleExitApp}>Exit</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default HomeScreen;
