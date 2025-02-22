import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { Button, Text, Card, PaperProvider } from "react-native-paper";

const MyMap = () => {
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

  const [markers, setMarkers] = useState([
    {
      title: "Purdue University",
      description: "West Lafayette, IN",
      coordinate: { latitude: 40.4237, longitude: -86.9212 },
    },
    {
      title: "Memorial Mall",
      description: "A beautiful spot on campus",
      coordinate: { latitude: 40.424, longitude: -86.9146 },
    },
    {
      title: "Ross-Ade Stadium",
      description: "Home of Purdue Football",
      coordinate: { latitude: 40.4352, longitude: -86.9186 },
    },
  ]);

  const buildingPolygons = [
    {
      id: "building1",
      coordinates: [
        { latitude: 40.426818, longitude: -86.913534 }, // Bottom Left
        { latitude: 40.426818, longitude: -86.912787 }, // Bottom right
        { latitude: 40.427562, longitude: -86.912815 }, // Top right
        { latitude: 40.427563, longitude: -86.913483 }, // Top left
      ],
      color: "rgba(255, 0, 0, 0.5)", // Red with 50% opacity
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

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 40.4237,
          longitude: -86.9212,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
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
              fillColor={building.color}
              strokeWidth={0}
            />
            <Marker coordinate={{ latitude: 40.424, longitude: -86.9146 }}>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText} numberOfLines={1}></Text>
              </View>
            </Marker>
          </React.Fragment>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    borderColor: "#666",
    borderWidth: 1,
    minWidth: 50, // Minimum width to avoid truncation
    maxWidth: 150, // Optional: Limit max width for long text
    alignItems: "center",
    justifyContent: "center",
  },
  labelText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "bold",
    flexWrap: "wrap",
    textAlign: "center",
  },
});

export default MyMap;
