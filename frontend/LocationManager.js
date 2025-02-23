// LocationTask.js
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { findBuildingByCoordinate } from "./util/util";
import axios from "axios";
import { endAsyncEvent } from "react-native/Libraries/Performance/Systrace";

const updateInterval = 2000; // 1 second
const SESSION_MINIMUM_THRESHOLD = 3000; // 3 seconds
const INBETWEEN_SESSION_THRESHOLD = 3000; // 3 seconds

const LOCATION_TASK_NAME = "background-location-task";
let cachedUserId = null;
let prevTimestamp = null;
let prevLocation = null;
let sessionId = null;
let iteration = 0;

// Define the background task
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data;
    const location = locations[0];

    if (cachedUserId === "defaultUserId") {
      cachedUserId = await AsyncStorage.getItem("userId");
      if (!cachedUserId) {
        cachedUserId = "defaultUserId"; // Fallback user ID
      }
      cachedUserId = "67ba3c2b75674ffe512e9bed";
    }
    cachedUserId = "67ba3c2b75674ffe512e9bed";

    if (location) {
      const currentBuilding = findBuildingByCoordinate(
        location.coords.latitude,
        location.coords.longitude
      );
      const currentTime = new Date();
      if (prevTimestamp === null) {
        prevTimestamp = currentTime;
      }
      console.log("Background Location:", location);
      console.log("User ID:", cachedUserId);
      console.log("type ser ID:", typeof cachedUserId);
      console.log("Current Building:", currentBuilding);

      if (currentBuilding != prevLocation) {
        prevLocation = currentBuilding;
        prevTimestamp = currentTime;
        sessionId = null;
      } else {
        if (
          currentTime - prevTimestamp > SESSION_MINIMUM_THRESHOLD &&
          (currentTime - prevTimestamp) / INBETWEEN_SESSION_THRESHOLD >
            iteration &&
          sessionId
        ) {
          console.log("Updating Data to Server");

          const response = await axios.post(
            "http://10.186.187.54:5003/updateSession",
            {
              sessionId: sessionId,
              endTime: currentTime,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              validateStatus: (status) => status < 500,
            }
          );

          iteration++;
        } else if (
          currentTime - prevTimestamp >= SESSION_MINIMUM_THRESHOLD &&
          !sessionId
        ) {
          console.log("Sending Data to Server");

          const response = await axios.post(
            "http://10.186.187.54:5003/newSession",
            {
              userId: cachedUserId,
              buildingName: currentBuilding,
              startTime: prevTimestamp,
              endTime: currentTime,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              validateStatus: (status) => status < 500,
            }
          );

          console.log("Response from Server:", response.status);

          if (response.status === 201) {
            console.log("Session Id Received:", response.data.sessionId);
            sessionId = response.data.sessionId;
          }
        }
      }
    }
  }
});

// Function to start background location tracking
export const startLocationTracking = async () => {
  cachedUserId = await AsyncStorage.getItem("userId");
  if (!cachedUserId) {
    cachedUserId = "defaultUserId"; // Fallback user ID
  }

  const { status } = await Location.requestForegroundPermissionsAsync();
  const bgStatus = await Location.requestBackgroundPermissionsAsync();

  if (status === "granted" && bgStatus.status === "granted") {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      distanceInterval: 10, // meters
      deferredUpdatesInterval: updateInterval, // ms
      showsBackgroundLocationIndicator: true, // Only for iOS
      foregroundService: {
        notificationTitle: "Tracking your location",
        notificationBody: "Your location is being used in the background.",
      },
      timeInterval: updateInterval, // Optional: Ensures updates every 10 seconds
      activityType: Location.ActivityType.Other, // Prevents iOS from suspending updates
      pausesUpdatesAutomatically: false, // Ensures updates continue when app is backgrounded
    });
  } else {
    console.error("Location permission not granted");
  }
};

// Function to stop background location tracking
export const stopLocationTracking = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
};
