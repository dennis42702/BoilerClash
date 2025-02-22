import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ToggleButton, useTheme } from "react-native-paper";

const ToggleButtonCategories = ({ onPress }) => {
  const { colors } = useTheme();
  const [viewType, setViewType] = useState("INDIVIDUAL");

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
          icon="menu"
          value="TOTAL"
          style={styles.toggleButton}
          onPress={() => onPress("TOTAL")}
        />
        <ToggleButton
          icon="office-building"
          value="BUILDING"
          style={styles.toggleButton}
          onPress={() => onPress("BUILDING")}
        />
        <ToggleButton
          icon="school"
          value="TEAM"
          style={styles.toggleButton}
          onPress={() => onPress("TEAM")}
        />
        <ToggleButton
          icon="emoticon-devil"
          value="RAID"
          style={styles.toggleButton}
          onPress={() => onPress("RAID")}
        />
      </ToggleButton.Group>
    </View>
  );
};

export default ToggleButtonCategories;
