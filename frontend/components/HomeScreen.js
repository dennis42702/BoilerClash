// HomeScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Card, Title, Paragraph } from "react-native-paper";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Welcome to the Home Page</Title>
          <Paragraph>
            This is a simple page created with React Native Paper.
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => alert("Button Pressed!")}>
            Click Me
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    padding: 16,
  },
});

export default HomeScreen;
