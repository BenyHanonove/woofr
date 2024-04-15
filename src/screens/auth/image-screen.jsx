import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

//Import image picker
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library';

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import RegularText from "../../components/texts/regular-text/regular-text";
import SmallText from "../../components/texts/small-text/small-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";


const ImageScreen = ({ route }) => {

  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  const getMediaLibraryPermission = async () => {
    const { status } = await requestMediaLibraryPermission();
    if (status !== 'granted') {
      console.log('Media library permission denied');
      return;
    }
  };
  
  const { userId } = route.params;
  //State to save the image
  const [image, setImage] = useState(null);

  const pickImage = async () => {
<<<<<<< Updated upstream
    // No permissions request is necessary for launching the image library
=======
    await getMediaLibraryPermission();
>>>>>>> Stashed changes

    // Launch the image library and await the result
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Specify that only images are allowed
      allowsEditing: true, // Allow the user to edit the selected image
      aspect: [4, 3], // Set the aspect ratio for the cropped image
      quality: 1, // Set the quality of the selected image
    });

    // Check if the user canceled the image selection
    if (!result.canceled) {
      // If the image selection was not canceled, set the image URI in state
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = () => {};

<<<<<<< Updated upstream
  const skipImageImageUpload = () => {};
=======
    try {
      // Fetch the image data
      const response = await fetch(image);
      const blob = await response.blob();

      // Convert blob to base64 string
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result;
        console.log(base64data);
        // Save base64 data to SQL table
        const response = await fetch('http://192.168.1.16:7207/api/Users/UploadImage/' + userId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
           // Authorization: `Bearer ${Config.API_KEY}`, 
          },
          body: JSON.stringify({ image: base64data }),
          
        });

        const result = await response.json();
        console.log('Image uploaded:', result);
        alert("zubi",result);
      };
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


  const skipImageUpload = () => {
    dispatch(login(user));
  };
>>>>>>> Stashed changes

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BigText text={"כותרת של הדף"} />
          <RegularText
            text={"תיאור קצר שמפרט על הדף ולמה להוסיף תמונה חשוב ביותר "}
          />
        </View>

        {image ? (
          <TouchableOpacity onPress={pickImage}>
            <Image source={{ uri: image }} style={styles.imagePreview} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.circle} onPress={pickImage}>
            <RegularText text={"בחר תמונה"} />
          </TouchableOpacity>
        )}

        <View style={styles.buttonContainer}>
<<<<<<< Updated upstream
          <RegularButton text={"הוסף"} onPress={uploadImage} />
          <TouchableOpacity onPress={skipImageImageUpload} style={styles.skip}>
=======
          <RegularButton text={"הוסף"} onPress={() => uploadImage(image)} />
          <TouchableOpacity onPress={skipImageUpload} style={styles.skip}>
>>>>>>> Stashed changes
            <SmallText text={"דלג"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    textAlign: "left",
    paddingRight: 20,
    paddingBottom: 20,
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  skip: {
    marginVertical: 13,
  },
});

export default ImageScreen;
