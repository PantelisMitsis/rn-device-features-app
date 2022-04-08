import { View, Alert, Text, StyleSheet, Image } from 'react-native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

import { Colors } from '../../constants/colors';
import OutlineButton from '../UI/OutlineButton';
import { getAddress, getMapPreview } from '../../util/location';



function LocationPicker({ onPickLocation }) {
  const navigation = useNavigation();
  const route = useRoute();

  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused();

  const [locationPermissionIformation, requestPermission] = useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = { lat: route.params.pickedLat, lng: route.params.pickedLng };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
        onPickLocation({...pickedLocation, address: address});
      }
    }

    handleLocation();
  }, [pickedLocation, onPickLocation]);

  async function verifyPermissions() {
    if (locationPermissionIformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (locationPermissionIformation.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permissions!', 'You need to grant location permissions to use this app.');
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    });
  }

  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  let locationPreview = <Text>No location picked yet.</Text>

  if (pickedLocation) {
    locationPreview =
      <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} />
  }



  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={getLocationHandler}>Locate User</OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlineButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  }
});


export default LocationPicker;