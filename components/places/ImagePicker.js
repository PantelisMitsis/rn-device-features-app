import { View, Alert, Image, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import OutlineButton from '../UI/OutlineButton';

function ImagePicker({onTakeImage}) {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState();

  async function verifyPermissions() {


    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }


    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permissions!', 'You need to grant camera permissions to use this app.');
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    setPickedImage(image.uri);
    onTakeImage(image.uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {imagePreview}
      </View>
      <OutlineButton icon='camera' onPress={takeImageHandler}>Take Image</OutlineButton>
    </View>
  );
}


const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden' //the same if put in styles.image borderRadius: 4
  },
  image:{
    width: '100%',
    height: '100%'
  }
})

export default ImagePicker;