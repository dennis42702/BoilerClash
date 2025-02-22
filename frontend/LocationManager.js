// LocationTask.js
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

const LOCATION_TASK_NAME = "background-location-task";

// Define the background task
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data;
    const location = locations[0];

    if (location) {
      console.log("Background Location:", location);

      // Send location to the remote API
      //   try {
      //     await fetch("https://your-remote-api.com/location", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         latitude: location.coords.latitude,
      //         longitude: location.coords.longitude,
      //         timestamp: location.timestamp,
      //       }),
      //     });
      //     console.log("Location sent successfully");
      //   } catch (e) {
      //     console.error("Failed to send location", e);
      //   }
    }
  }
});

// Function to start background location tracking
export const startLocationTracking = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  const bgStatus = await Location.requestBackgroundPermissionsAsync();

  if (status === "granted" && bgStatus.status === "granted") {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      distanceInterval: 10, // meters
      deferredUpdatesInterval: 10000, // ms
      showsBackgroundLocationIndicator: true, // Only for iOS
      foregroundService: {
        notificationTitle: "Tracking your location",
        notificationBody: "Your location is being used in the background.",
      },
      timeInterval: 10000, // Optional: Ensures updates every 10 seconds
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
