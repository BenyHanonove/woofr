import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
//Import Dropdown Picker component
import DropDownPicker from "react-native-dropdown-picker";
//Import DateTime Picker component
import DateTimePicker from "@react-native-community/datetimepicker";

//Import SnackBar Picker component
import { Snackbar } from "react-native-paper";

//React native expo store handler
import * as SecureStore from "expo-secure-store";

//Import custom components
import BigText from "../../components/texts/big-text/big-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import RegularText from "../../components/texts/regular-text/regular-text";
import { signupValidator } from "../../utils/scripts/formValidate";

const SignupScreen = () => {
  const navigation = useNavigation();

  // State for user data
  const [userData, setUserData] = useState({
    username: "",
    firstName: "", // User's first name
    lastName: "", // User's last name
    gender: "", // User's gender
    birthDate: new Date(), // User's birthday, initialized with current date
    email: "", // User's email address
    password: "", // User's password
  });




  // State for dropdown picker visibility
  const [openGender, setOpenGender] = useState(false);

  // Function to handle gender change
  const handleSubmit = async () => {
    const formCheck = signupValidator(userData);
    if (formCheck.isValid === false) {
      setSnackBarText(formCheck.errorMessage);
      setSnackbarOpen(true);

      // Set snackbar open for 3 seconds
      setTimeout(() => {
        setSnackbarOpen(false);
        return;
      }, 3000);
      return; // Return early if form is invalid
    }

    const saveUser = async () => {
      try {
        // Save token using SecureStore
        //    await SecureStore.setItemAsync("secure_token1", "sahdkfjaskdflas$%^&");

        // Make API request to register user
        const apiUrl = 'https://localhost:7207/api/Users';
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify(userData) // Pass user data as JSON
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to register user');
            }
            return response.json();
          })
          .then(data => {
            console.log('User registered successfully:', data);
            // Navigate to next screen or perform other actions
            navigation.navigate('Image');
          })
          .catch(error => {
            // Handle any errors that occur during the API request
            console.error('Error:', error);
            // Optionally, show an error message to the user
          });
      } catch (error) {
        // Handle any errors that occur during saving the token
        console.error('Error:', error);
        // Optionally, show an error message to the user
      }
    };


    // Call the saveUser function
    await saveUser();
  };

  const genders = [
    { label: "זכר", value: "male" },
    { label: "נקבה", value: "female" },
    { label: "אחר", value: "other" },
  ];

  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BigText text={"הצטרף לחוויה שלנו"} />
          <RegularText
            text={
              "בלה בלה בלה חוויה יחודית שלנו שתתן לך ביצועים מצויינים עם פיצרים פגז בלה בלה בלה"
            }
          />
        </View>

        <ScrollView style={styles.scrollView}>
          <View>
            <TextInput
              value={userData.firstName}
              placeholder="שם פרטי"
              style={styles.input}
              onChangeText={(value) => {
                setUserData({ ...userData, firstName: value });
              }}
            />
            <TextInput
              value={userData.lastName}
              placeholder="שם משפחה"
              style={styles.input}
              onChangeText={(value) => {
                setUserData({ ...userData, lastName: value });
              }}
            />
            <TextInput
              value={userData.username}
              placeholder="שם משתמש"
              style={styles.input}
              onChangeText={(value) => {
                setUserData({ ...userData, username: value });
              }}
            />

            <TextInput
              value={userData.email}
              placeholder="איימל"
              style={styles.input}
              onChangeText={(value) => {
                setUserData({ ...userData, email: value });
              }}
            />

            <TextInput
              value={userData.password}
              placeholder="סיסמא"
              style={styles.input}
              onChangeText={(value) => {
                setUserData({ ...userData, password: value });
              }}
            />

            <TextInput
              value={userData.confirm}
              placeholder="אימות סיסמא"
              style={styles.input}
              onChangeText={(value) => {
                setUserData({ ...userData, confirm: value });
              }}
            />

            <DateTimePicker
              value={userData.birthDate} // Provide the current date as the initial value
              onChange={(event, selectedDate) => {
                if (selectedDate !== undefined) { // Check if a date is selected
                  setUserData({ ...userData, birthDate: selectedDate });
                }
              }}
            />
            <DropDownPicker
              open={openGender}
              value={userData.gender}
              items={genders}
              setOpen={setOpenGender}
              onSelectItem={(value) => {
                setUserData({ ...userData, gender: value["value"] });
              }}
            />
          </View>
        </ScrollView>

        <RegularButton text={"הירשם"} onPress={handleSubmit} />
      </View>

      <Snackbar
        visible={snackbarOpen}
        onDismiss={() => { }}
        action={{
          label: "סגור",
          onPress: () => {
            setSnackbarOpen(false);
          },
        }}
      >
        {snackBarText}
      </Snackbar>
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
    direction: "rtl",
    textAlign: "left",
    paddingRight: 20,
    paddingBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: 300,
  },
});

export default SignupScreen;
