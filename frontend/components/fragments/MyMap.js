import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { FAB, Button, Text, Card, PaperProvider } from "react-native-paper";

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
      id: "WALC",
      coordinates: [
        { latitude: 40.427569, longitude: -86.913537 },
        { latitude: 40.427569, longitude: -86.912798 },
        { latitude: 40.426816, longitude: -86.912798 },
        { latitude: 40.426816, longitude: -86.913537 },
      ],
      color: "rgba(255, 0, 0, 0.5)",
      conquered: "College of Science",
    },
    {
      id: "STEW",
      coordinates: [
        { latitude: 40.425438, longitude: -86.913447 },
        { latitude: 40.425438, longitude: -86.911969 },
        { latitude: 40.424672, longitude: -86.911969 },
        { latitude: 40.424672, longitude: -86.913447 },
      ],
      color: "rgba(255, 255, 0, 0.5)",
      conquered: "College of Science",
    },
    {
      id: "KRAN",
      coordinates: [
        { latitude: 40.42385, longitude: -86.911272 },
        { latitude: 40.42385, longitude: -86.910506 },
        { latitude: 40.4235, longitude: -86.910506 },
        { latitude: 40.4235, longitude: -86.911272 },
      ],
      color: "rgba(200, 100, 0, 0.5)",
      conquered: "Polytechnic Institute",
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
            <Marker
              title={building.id}
              coordinate={calculatePolygonCenter(building.coordinates)}
            ></Marker>
          </React.Fragment>
        ))}
      </MapView>
      <FAB icon="plus" style={styles.fab} />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default MyMap;
