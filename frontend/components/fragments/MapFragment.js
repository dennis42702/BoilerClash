import React, { useState, useRef } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import MapView, { Callout, Marker, Polygon } from "react-native-maps";
import { FAB, Button, Text, Card, PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import buildingsData from "../buildings.json";
import { collegeToIcon } from "../../util/util";
import { requestFormReset } from "react-dom";

const MapFragment = () => {
  const mapRef = useRef(null);

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
      >
        {buildingsData.map((building) => (
          <React.Fragment key={building.id}>
            <Polygon
              key={building.id}
              coordinates={building.coordinates}
              fillColor={getHeatmapColor(building.crowdedness)}
              strokeWidth={0}
            />
            <Marker
              title={building.id}
              coordinate={calculatePolygonCenter(building.coordinates)}
              icon={require("../../assets/castle.png")}
              // icon={iconImages[collegeToIcon(building.conquered)]}
            >
              <Callout>
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
              </Callout>
            </Marker>
          </React.Fragment>
        ))}
      </MapView>
      <FAB icon="fire" style={styles.fab} />
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 200,
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
