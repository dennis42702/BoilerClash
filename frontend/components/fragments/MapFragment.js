import React, { useState, useRef } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import MapView, { Callout, Marker, Polygon, Heatmap } from "react-native-maps";
import { FAB, Button, Paragraph, Dialog, Portal } from "react-native-paper";
import buildingsData from "../buildings.json";
import { collegeToIcon } from "../../util/util";
import MapToggleButton from "../subcomponents/MapToggleButton";
import sampleData from "../sample_people_at_purdue.json";

const MapFragment = () => {
  const mapRef = useRef(null);
  const [viewType, setViewType] = useState("CROWDEDNESS");
  const [radius, setRadius] = useState(20);
  const [visible, setVisible] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const handleRegionChange = (region) => {
    const { latitudeDelta } = region;
    // Dynamically calculate the radius based on the zoom level
    console.log("Latitude Delta", latitudeDelta);
    const newRadius = Math.max(10, Math.min(40, 1.0 / latitudeDelta));
    setRadius(newRadius);
    console.log("New radius", radius);
  };

  const iconImages = {
    corn: require("../../assets/corn.png"),
    handshake: require("../../assets/handshake.png"),
    book_education: require("../../assets/book_education.png"),
    cog: require("../../assets/cog.png"),
    magnify: require("../../assets/magnify.png"),
    stethoscope: require("../../assets/stethoscope.png"),
    book: require("../../assets/book.png"),
    pill: require("../../assets/pill.png"),
    monitor: require("../../assets/monitor.png"),
    flask: require("../../assets/flask.png"),
    paw: require("../../assets/paw.png"),
  };

  const customMapStyle = [
    {
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
  ];

  const handleMapPress = (event) => {
    return;
  };

  // Grid parameters
  const gridSize = 0.0005; // Determines the grid cell size (smaller = more cells)

  // Function to aggregate heatmap points into a grid
  const aggregatePointsToGrid = (points, gridSize) => {
    const grid = {};

    points.forEach((point) => {
      const gridX = Math.floor(point.latitude / gridSize);
      const gridY = Math.floor(point.longitude / gridSize);
      const gridKey = `${gridX},${gridY}`;

      if (!grid[gridKey]) {
        grid[gridKey] = { ...point, weight: 1 };
      } else {
        grid[gridKey].weight += 1;
      }
    });

    return Object.values(grid);
  };

  const heatmapPoints = aggregatePointsToGrid(
    sampleData.map((person) => ({
      latitude: person.latitude,
      longitude: person.longitude,
    })),
    gridSize
  );

  const getHeatmapColor = (score) => {
    // Ensure score is within the 0 to 1 range
    score = Math.max(0, Math.min(1, score));

    // Interpolate between green and red
    const red = Math.floor(255 * score);
    const green = Math.floor(255 * (1 - score));
    const blue = 0; // No blue component for this gradient

    // Return as an rgba color with 50% opacity
    return `rgba(${red}, ${green}, ${blue}, 0.5)`;
  };

  const calculatePolygonCenter = (coordinates) => {
    const latitudes = coordinates.map((coord) => coord.latitude);
    const longitudes = coordinates.map((coord) => coord.longitude);
    const latitude =
      latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
    const longitude =
      longitudes.reduce((sum, lng) => sum + lng, 0) / longitudes.length;
    return { latitude, longitude };
  };

  const showDialog = (building) => {
    setSelectedBuilding(building);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setSelectedBuilding(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 40.425, // Center of Purdue University
          longitude: -86.913,
          latitudeDelta: 0.01, // Zoomed to campus level
          longitudeDelta: 0.01,
        }}
        onMapReady={() => {
          mapRef.current?.animateToRegion(
            {
              latitude: 40.425,
              longitude: -86.913,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            10
          );
        }}
        showsUserLocation={true}
        showsBuildings={false}
        onPress={handleMapPress}
        customMapStyle={customMapStyle}
        onRegionChangeComplete={handleRegionChange}
      >
        {viewType == "CROWDEDNESS" ? (
          <Heatmap
            points={heatmapPoints}
            opacity={0.5}
            radius={radius}
            gradient={{
              colors: ["#00f", "#0f0", "#ff0", "#f00"],
              startPoints: [0.1, 0.4, 0.7, 1.0],
              colorMapSize: 256,
            }}
          />
        ) : (
          ""
        )}
        {buildingsData.map((building) => (
          <React.Fragment key={building.id}>
            <Polygon
              key={building.id}
              coordinates={building.coordinates}
              fillColor={
                viewType == "CROWDEDNESS"
                  ? getHeatmapColor(building.crowdedness)
                  : "rgba(50, 50, 50, 0.2)"
              }
              strokeWidth={0}
            />
            <Marker
              // title={building.id}
              // description="Long ass description.Hosung is a fucking motherfucker and doesn't know shit about coding"
              coordinate={calculatePolygonCenter(building.coordinates)}
              icon={
                viewType == "CROWDEDNESS"
                  ? require("../../assets/marker.png")
                  : iconImages[collegeToIcon(building.conquered)]
              }
              onPress={() => showDialog(building)}
              // icon={iconImages[collegeToIcon(building.conquered)]}
            >
              {/* <Callout>
                <View style={styles.calloutContainer}>
                  <Card style={styles.calloutCard}>
                    <Card.Content>
                      <Text variant="titleMedium" style={styles.buildingName}>
                        {building.building_name}HI
                      </Text>
                      <Text>
                        Crowdedness: {(building.crowdedness * 100).toFixed(0)}%
                      </Text>
                      <Text>Conquered by: {building.conquered}</Text>
                    </Card.Content>
                  </Card>
                </View>
              </Callout> */}
            </Marker>
          </React.Fragment>
        ))}
      </MapView>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={{ textAlign: "center" }}>
            {selectedBuilding?.id ?? "Building Details"}
          </Dialog.Title>
          <Dialog.Content>
            {selectedBuilding?.image && (
              <Image
                source={{ uri: selectedBuilding.image }}
                style={styles.dialogImage}
              />
            )}
            <Paragraph>
              Crowdedness: {(selectedBuilding?.crowdedness * 100).toFixed(0)}%
            </Paragraph>
            <Paragraph>
              Conquered by: {selectedBuilding?.conquered ?? "N/A"}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View style={styles.toggleButtonContainer}>
        <MapToggleButton onPress={(viewType) => setViewType(viewType)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calloutContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  dialogImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  toggleButtonContainer: {
    position: "absolute",
    top: 20, // Distance from the top of the screen
    right: 20, // Distance from the right edge
    zIndex: 10, // Ensure it floats above other elements
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
    padding: 5,
    elevation: 5, // Add shadow (Android)
    shadowColor: "#000", // Add shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  iconContainer: {
    alignItems: "center",
  },
  labelContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 4,
    // paddingHorizontal: 8,
    borderRadius: 5,
    borderColor: "#666",
    borderWidth: 1,
    minWidth: 50, // Minimum width to avoid truncation
    // maxWidth: 150, // Optional: Limit max width for long text
    // alignItems: "center",
    // justifyContent: "center",
  },
  labelText: {
    color: "#333",
    fontSize: 9,
    fontWeight: "bold",
    flexWrap: "wrap",
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    top: 0,
  },
  calloutCard: {
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  buildingName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default MapFragment;
