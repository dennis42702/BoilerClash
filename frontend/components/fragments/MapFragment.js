import React, { useState, useRef } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { FAB, Button, Text, Card, PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MapFragment = () => {
  const mapRef = useRef(null);

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

  const buildingPolygons = [
    {
      id: "WALC",
      coordinates: [
        { latitude: 40.427869, longitude: -86.913537 },
        { latitude: 40.427869, longitude: -86.912798 },
        { latitude: 40.426816, longitude: -86.912798 },
        { latitude: 40.426816, longitude: -86.913537 },
      ],
      crowdedness: 0.88,
    },
    {
      id: "STEW",
      coordinates: [
        { latitude: 40.425438, longitude: -86.913447 },
        { latitude: 40.425438, longitude: -86.911969 },
        { latitude: 40.424672, longitude: -86.911969 },
        { latitude: 40.424672, longitude: -86.913447 },
      ],
      crowdedness: 0.4,
    },
    {
      id: "KRAN",
      coordinates: [
        { latitude: 40.42385, longitude: -86.911272 },
        { latitude: 40.42385, longitude: -86.910506 },
        { latitude: 40.4235, longitude: -86.910506 },
        { latitude: 40.4235, longitude: -86.911272 },
      ],
      crowdedness: 0.2,
    },
  ];

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkers([
      ...markers,
      {
        title: "New Marker",
        description: "Added by tap",
        coordinate,
      },
    ]);
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
        {buildingPolygons.map((building) => (
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
            ></Marker>
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
});

export default MapFragment;
