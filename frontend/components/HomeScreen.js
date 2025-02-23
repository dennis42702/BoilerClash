// HomeScreen.js
import * as React from "react";
import { BottomNavigation, Text, useTheme } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, View } from "react-native";
import LeaderboardFragment from "./fragments/LeaderboardFragment";
import MapFragment from "./fragments/MapFragment";
import ProfileFragment from "./fragments/ProfileFragment";

const LeaderboardRoute = () => <LeaderboardFragment />;

const MapRoute = () => <MapFragment />;

const ProfileRoute = () => <ProfileFragment />;

const HomeScreen = () => {
  const navigation = useNavigation();
  // const route = useRoute();
  // const { userId } = route.params;

  const { colors } = useTheme();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
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
    leaderboard: LeaderboardRoute,
    map: MapRoute,
    profile: ProfileRoute,
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: colors.white }}
        activeIndicatorStyle={{ backgroundColor: colors.light_grey }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
