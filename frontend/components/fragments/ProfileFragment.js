import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { Text, Button, PaperProvider, Avatar, DataTable } from "react-native-paper";
import axios from "axios";
import { BarChart } from "react-native-chart-kit";
import dailyUsageData from "../../data/dailyUsage.json";
import weeklyUsageData from "../../data/weeklyUsage.json";
import monthlyUsageData from "../../data/monthlyUsage.json";
import { useTheme } from "react-native-paper";

// Get screen width for charts
const screenWidth = Dimensions.get("window").width;

const ProfileFragment = () => {
  const { colors } = useTheme();
  // State for time period selection
  const [timePeriod, setTimePeriod] = useState("WEEK");
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

  // Study Time Data
  const studyData = [
    { id: "1", building: "Library", hours: 15 },
    { id: "2", building: "Science Hall", hours: 12 },
    { id: "3", building: "Dorm Study Room", hours: 9 },
  ];

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    userInfo: {
      marginLeft: 15,
    },
    toggleContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 15,
    },
    toggleButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginHorizontal: 5,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.background,
    },
    activeButton: {
      backgroundColor: colors.primary,
    },
    toggleText: {
      fontSize: 16,
      color: colors.text,
      fontWeight: "bold",
    },
    activeText: {
      color: colors.primary_super_light,
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
      textAlign: "center",
      fontSize: 16,
      marginVertical: 10,
    },
  });

  // Fetch data when `timePeriod` changes
  useEffect(() => {
    fetchUsageData();
  }, [timePeriod]);

  const fetchUsageData = async () => {
    setLoading(true);

    try {
      if (timePeriod === "TODAY") {
        setDailyUsage(dailyUsageData);
      } else if (timePeriod === "WEEK") {
        setWeeklyUsage(weeklyUsageData);
      } else if (timePeriod === "MONTH") {
        setMonthlyUsage(monthlyUsageData);
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

        {/* Toggle Button for Time Period Selection */}
        <View style={styles.toggleContainer}>
          {["TODAY", "WEEK", "MONTH"].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.toggleButton, timePeriod === option && styles.activeButton]}
              onPress={() => setTimePeriod(option)}
            >
              <Text style={[styles.toggleText, timePeriod === option && styles.activeText]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Loading Indicator */}
        {loading && <Text style={styles.loadingText}>Loading data...</Text>}

        {/* Graphs Based on Selected Time Period */}
        <View style={styles.chartContainer}>
          {timePeriod === "TODAY" && dailyUsage.length > 0 && (
            <>
              <Text style={styles.chartTitle}>Hourly Usage</Text>
              <BarChart
                data={{
                  labels: ["0 AM", "6 AM", "12 PM", "6 PM"],   // 12-hour format
                  datasets: [{ data: dailyUsage.map((item) => item.minutes) }],
                }}
                width={screenWidth - 40}
                height={220}
                fromZero
                yAxisLabel=""
                yAxisSuffix="m"
                yAxisInterval={15} 
                chartConfig={{
                  backgroundGradientFrom: colors.background,
                  backgroundGradientTo: colors.surface,
                  color: (opacity = 1) => colors.primary, 
                  barPercentage: 0.1,
                  barRadius: 4,
                }}
              />
            </>
          )}

          {timePeriod === "WEEK" && weeklyUsage.length > 0 && (
            <>
              <Text style={styles.chartTitle}>Daily Usage</Text>
              <BarChart
                data={{
                  labels: ["S", "M", "T", "W", "T", "F", "S"],  // Short format for days
                  datasets: [{ data: weeklyUsage.map((item) => item.minutes) }],
                }}
                width={screenWidth - 40}
                height={220}
                yAxisLabel=""
                yAxisSuffix="h"
                fromZero
                chartConfig={{
                  backgroundGradientFrom: colors.background,
                  backgroundGradientTo: colors.surface,
                  color: (opacity = 1) => colors.primary,
                  barPercentage: 0.4,
                  barRadius: 5,
                }}
              />
            </>
          )}

          {timePeriod === "MONTH" && monthlyUsage.length > 0 && (
            <>
              <Text style={styles.chartTitle}>Monthly Weekly Usage</Text>
              <BarChart
                data={{
                  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],  // Dynamically map weeks
                  datasets: [{ data: monthlyUsage.map((item) => item.minutes) }],
                }}
                width={screenWidth - 40}
                height={220}
                yAxisLabel=""
                yAxisSuffix="h"
                fromZero
                chartConfig={{
                  backgroundGradientFrom: colors.background,
                  backgroundGradientTo: colors.surface,
                  color: (opacity = 1) => colors.primary,
                  barPercentage: 0.5,
                  barRadius: 5,
                }}
              />
            </>
          )}

        </View>

        {/* Study Time Table */}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Building</DataTable.Title>
            <DataTable.Title numeric>HRs</DataTable.Title>
          </DataTable.Header>

          <FlatList
            data={studyData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DataTable.Row>
                <DataTable.Cell>{item.building}</DataTable.Cell>
                <DataTable.Cell numeric>{item.hours}</DataTable.Cell>
              </DataTable.Row>
            )}
          />
        </DataTable>

      </ScrollView>
    </PaperProvider>
  );
};



export default ProfileFragment;
