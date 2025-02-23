import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ToggleButton, useTheme } from "react-native-paper";

const MapToggleButton = ({ onPress }) => {
  const { colors } = useTheme();
  const [viewType, setViewType] = useState("CROWDEDNESS");

  const styles = StyleSheet.create({
    toggleContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 10,
    },
    toggleButton: {
      borderColor: colors.text, // Darker gold as the border color
      borderWidth: 1,
      borderRadius: 0,
      marginHorizontal: 0,
    },
  });

  return (
    <View style={styles.toggleContainer}>
      <ToggleButton.Group
        onValueChange={(value) => setViewType(value)}
        value={viewType}
      >
        <ToggleButton
          icon="fire"
          value="CROWDEDNESS"
          style={styles.toggleButton}
          onPress={() => onPress("CROWDEDNESS")}
        />
        <ToggleButton
          icon="castle"
          value="RANKING"
          style={styles.toggleButton}
          onPress={() => onPress("RANKING")}
        />
      </ToggleButton.Group>
    </View>
  );
};

export default MapToggleButton;
