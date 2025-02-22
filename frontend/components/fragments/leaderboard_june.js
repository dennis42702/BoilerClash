import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, Menu, PaperProvider, Avatar, Card } from 'react-native-paper';

const LeaderboardFragment = () => {
  // Dropdown State
  const [category, setCategory] = useState('TOTAL');
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);

  const [viewType, setViewType] = useState('INDIVIDUAL');
  const [viewTypeMenuVisible, setViewTypeMenuVisible] = useState(false);

  // Sample Leaderboard Data
  const leaderboardData = [
    { rank: 1, username: 'gustavo', major: 'Computer Science', hr: 15628 },
    { rank: 2, username: 'tianyi', major: 'Industrial Engineering', hr: 12876 },
    { rank: 3, username: 'jacob', major: 'Business', hr: 10887 },
    { rank: 4, username: 'karius', major: 'Computer Science', hr: 9827 },
    { rank: 5, username: 'segyul', major: 'Industrial Engineering', hr: 9655 },
    { rank: 6, username: 'dennis', major: 'Business', hr: 8876 },
    { rank: 7, username: 'june', major: 'Computer Science', hr: 8450 },
    { rank: 8, username: 'joshua', major: 'Industrial Engineering', hr: 8000 },
    { rank: 9, username: 'brian', major: 'Business', hr: 7500 },
    { rank: 10, username: 'popping', major: 'Computer Science', hr: 7200 },
    { rank: 11, username: 'kendrick', major: 'Industrial Engineering', hr: 6900 },
  ];

  // Renders each leaderboard entry
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.rank}>{item.rank}</Text>
        <Avatar.Image size={50} source={{ uri: 'https://source.unsplash.com/random' }} />
        <View style={styles.info}>
          {viewType === 'INDIVIDUAL' && <Text style={styles.username}>{item.username}</Text>}
          <Text style={styles.major}>{item.major}</Text>
        </View>
        <Text style={styles.hr}>{item.hr}</Text>
      </View>
    </Card>
  );

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* Dropdown Menus */}
        <View style={styles.dropdownContainer}>
          {/* Left Dropdown */}
          <Menu
            visible={categoryMenuVisible}
            onDismiss={() => setCategoryMenuVisible(false)}
            anchor={
              <Button mode="outlined" onPress={() => setCategoryMenuVisible(true)} style={styles.dropdown}>
                {category}
              </Button>
            }
          >
            <Menu.Item onPress={() => setCategory('TOTAL')} title="TOTAL" />
            <Menu.Item onPress={() => setCategory('BUILDING')} title="BUILDING" />
            <Menu.Item onPress={() => setCategory('TEAM')} title="TEAM" />
            <Menu.Item onPress={() => setCategory('RAID')} title="RAID" />
          </Menu>

          {/* Right Dropdown */}
          <Menu
            visible={viewTypeMenuVisible}
            onDismiss={() => setViewTypeMenuVisible(false)}
            anchor={
              <Button mode="outlined" onPress={() => setViewTypeMenuVisible(true)} style={styles.dropdown}>
                {viewType}
              </Button>
            }
          >
            <Menu.Item onPress={() => setViewType('TEAM')} title="TEAM" />
            <Menu.Item onPress={() => setViewType('INDIVIDUAL')} title="INDIVIDUAL" />
          </Menu>
        </View>

        {/* Leaderboard List */}
        <FlatList
          data={leaderboardData}
          keyExtractor={(item) => item.rank.toString()}
          renderItem={renderItem}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1E1E50',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dropdown: {
    width: 150,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#2A2A70',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    marginRight: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  major: {
    fontSize: 14,
    color: '#A0A0D0',
  },
  hr: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LeaderboardFragment;
