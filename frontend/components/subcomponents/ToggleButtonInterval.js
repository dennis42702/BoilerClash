import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";

const ToggleButtonInterval = () => {
  const [value, setValue] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "WEEKLY",
            label: "Weekly",
          },
          {
            value: "MONTHLY",
            label: "Monthly",
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default ToggleButtonInterval;
