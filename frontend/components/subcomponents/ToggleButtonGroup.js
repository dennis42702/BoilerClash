import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ToggleButton, useTheme } from "react-native-paper";

const ToggleButtonGroup = ({ onPress }) => {
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

  const handleValueChange = (value) => {
    if (value == null) return;
    // console.log("Value changed to:", value);
    if (value !== viewType) {
      setViewType(value);
      onPress(value);
    }
  };

  return (
    <View style={styles.toggleContainer}>
      <ToggleButton.Group onValueChange={handleValueChange} value={viewType}>
        <ToggleButton
          icon="account-group-outline"
          value="TEAM"
          style={styles.toggleButton}
          onPress={() => onPress("TEAM")}
        />
        <ToggleButton
          icon="account-outline"
          value="INDIVIDUAL"
          style={styles.toggleButton}
          onPress={() => onPress("INDIVIDUAL")}
        />
      </ToggleButton.Group>
    </View>
  );
};

export default ToggleButtonGroup;
