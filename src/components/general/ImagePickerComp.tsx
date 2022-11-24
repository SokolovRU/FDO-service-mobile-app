import * as ImagePicker from "expo-image-picker";

export const pickImage = async (setImage: any) => {
  ImagePicker.getCameraPermissionsAsync();
  let result: any = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
    allowsMultipleSelection: true,
    selectionLimit: 5,
  });

  if (!result.cancelled) {
    setImage(result.uri);
  }
};
