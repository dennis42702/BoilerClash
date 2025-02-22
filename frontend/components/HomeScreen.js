// HomeScreen.js
import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import LeaderboardFragment from "./fragments/leaderboard_june";
import MyMap from "./fragments/MyMap";
// import { MatieralCommunityIcons } from "react-native-vector-icons";
// import  "react-native-vector-icons/MaterialCommunityIcons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MusicRoute = () => <LeaderboardFragment />;

const AlbumsRoute = () => <MyMap />;

const RecentsRoute = () => <Text>Recents</Text>;

const HomeScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "music",
      title: "Leaderboard",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    { key: "albums", title: "Map", focusedIcon: "album" },
    { key: "recents", title: "My Page", focusedIcon: "history" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default HomeScreen;
