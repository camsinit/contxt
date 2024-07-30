import * as Location from 'expo-location';

const accuracyMapping = {
  Lowest: Location.Accuracy.Lowest,
  Low: Location.Accuracy.Low,
  Balanced: Location.Accuracy.Balanced,
  High: Location.Accuracy.High,
  Highest: Location.Accuracy.Highest,
  BestForNavigation: Location.Accuracy.BestForNavigation,
};

async function getLocation({ accuracy } = {}) {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return;
  }

  const accuracyValue = accuracyMapping[accuracy] ?? Location.Accuracy.Highest;
  const { coords } = await Location.getCurrentPositionAsync({
    accuracy: accuracyValue,
  });
  return coords;
}

export default getLocation;
