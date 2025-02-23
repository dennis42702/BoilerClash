import buildingData from "../components/buildings.json";

const collegeToIconMap = new Map(
  ["College of Agriculture", "corn"],
  ["Daniels School of Business", "handshake"],
  ["College of Education", "book-education"],
  ["College of Engineering", "cog"],
  ["Exploratory Studies", "magnify"],
  ["College of Health and Human Sciences", "stethoscope"],
  ["College of Liberal Arts", "book"],
  ["College of Pharmacy", "pill"],
  ["Purdue Polytechnic", "monitor"],
  ["College of Science", "flask"],
  ["College of Veterinary Medicine", "paw"]
);

export const collegeToIcon = (college) => {
  return collegeToIconMap.get(college) || "school";
};

const isPointInPolygon = (latitude, longitude, polygon) => {
  const latitudes = polygon.map((coord) => coord.latitude);
  const longitudes = polygon.map((coord) => coord.longitude);

  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);

  return (
    latitude >= minLat &&
    latitude <= maxLat &&
    longitude >= minLng &&
    longitude <= maxLng
  );
};

export const findBuildingByCoordinate = (latitude, longitude) => {
  for (const building of buildingData) {
    if (isPointInPolygon(latitude, longitude, building.coordinates)) {
      return building.buliding_name;
    }
  }
  return "";
};
