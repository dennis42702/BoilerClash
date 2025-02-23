import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import { Text, Button, Menu, PaperProvider, Avatar, DataTable } from "react-native-paper";
import { BarChart, XAxis, YAxis, PieChart } from "recharts";
import axios from "axios";

const ProfileFragment = () => {
  const [timePeriod, setTimePeriod] = useState("WEEK");
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Data states
  const [dailyUsage, setDailyUsage] = useState([]);
  const [weeklyUsage, setWeeklyUsage] = useState([]);
  const [monthlyUsage, setMonthlyUsage] = useState([]);

  // User Data
  const userData = {
    username: "john_doe",
    name: "John Doe",
    classMajor: "Junior, Computer Science",
    profilePic: "https://source.unsplash.com/100x100/?face",
  };

  // Fetch data when `timePeriod` changes
  useEffect(() => {
    fetchUsageData();
  }, [timePeriod]);

  const fetchUsageData = async () => {
    setLoading(true);
    let endpoint = "";
    
    // Select API endpoint based on timePeriod
    if (timePeriod === "TODAY") {
      endpoint = "http://10.186.105.111:5003/usage/daily";
    } else if (timePeriod === "WEEK") {
      endpoint = "http://10.186.105.111:5003/usage/weekly";
    } else if (timePeriod === "MONTH") {
      endpoint = "http://10.186.105.111:5003/usage/monthly";
    }

    try {
      const response = await axios.get(endpoint);
      if (timePeriod === "TODAY") {
        setDailyUsage(response.data);
      } else if (timePeriod === "WEEK") {
        setWeeklyUsage(response.data);
      } else if (timePeriod === "MONTH") {
        setMonthlyUsage(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <Avatar.Image size={60} source={{ uri: userData.profilePic }} />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{userData.username}</Text>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.classMajor}>{userData.classMajor}</Text>
          </View>
        </View>

        {/* Dropdown Menu for Time Selection */}
        <View style={styles.dropdownContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button mode="outlined" onPress={() => setMenuVisible(true)} style={styles.dropdown}>
                {timePeriod}
              </Button>
            }
          >
            <Menu.Item onPress={() => setTimePeriod("TODAY")} title="TODAY" />
            <Menu.Item onPress={() => setTimePeriod("WEEK")} title="WEEK" />
            <Menu.Item onPress={() => setTimePeriod("MONTH")} title="MONTH" />
          </Menu>
        </View>

        {/* Loading Indicator */}
        {loading && <Text style={styles.loadingText}>Loading data...</Text>}

        {/* Graphs Based on Selected Time Period */}
        <View style={styles.chartContainer}>
          {timePeriod === "TODAY" && dailyUsage.length > 0 && (
            <>
              <Text style={styles.chartTitle}>Hourly Usage</Text>
              <BarChart width={320} height={200} data={dailyUsage}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Bar dataKey="minutes" fill="#8884d8" />
              </BarChart>
            </>
          )}

          {timePeriod === "WEEK" && weeklyUsage.length > 0 && (
            <>
              <Text style={styles.chartTitle}>Daily Usage</Text>
              <BarChart width={320} height={200} data={weeklyUsage}>
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="minutes" fill="#82ca9d" />
              </BarChart>
            </>
          )}

          {timePeriod === "MONTH" && monthlyUsage.length > 0 && (
            <>
              <Text style={styles.chartTitle}>Monthly Usage</Text>
              <PieChart width={320} height={200}>
                <Pie dataKey="value" data={monthlyUsage} fill="#82ca9d" label />
              </PieChart>
            </>
          )}
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userInfo: {
    marginLeft: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
    color: "gray",
  },
  classMajor: {
    fontSize: 14,
    color: "gray",
  },
  dropdownContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  dropdown: {
    width: 120,
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});

export default ProfileFragment;
