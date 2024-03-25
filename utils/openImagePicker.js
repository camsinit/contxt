import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import assetToBase64 from './assetToBase64';

async function openImagePicker({
  mediaTypes = ImagePicker.MediaTypeOptions.Images,
  allowsEditing = false,
  quality = 1,
  allowsMultipleSelection = false,
  showAlertOnPermissionError = true,
  permissionErrorMessage = 'Sorry, we need media library permissions to make this work.',
}) {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.error('Media library permissions were not granted.');
      if (showAlertOnPermissionError) {
        alert(permissionErrorMessage);
      }
      return;
    }
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes,
    allowsEditing,
    quality,
    allowsMultipleSelection,
  });

  if (result.canceled) {
    console.error('Open image picker action was canceled');
    return;
  }

  const assets = result.assets;

  if (!assets || assets.length === 0) {
    console.error('No assets were returned with the open image picker action');
    return;
  }

  if (allowsMultipleSelection) {
    return await Promise.all(assets.map(asset => assetToBase64(asset)));
  } else {
    return await assetToBase64(assets[0]);
  }
}

export default openImagePicker;
