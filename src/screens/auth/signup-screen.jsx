//signup-screen.tsx

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";

//Navigation handler
import { useNavigation } from "@react-navigation/native";

//Packages to handel user input
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Snackbar } from "react-native-paper";

//User id generator
import uuid from "react-native-uuid";

//Store user data handler
import * as SecureStore from "expo-secure-store";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import RegularText from "../../components/texts/regular-text/regular-text";
import GoBackButton from "../../components/buttons/go-back/go-back-button";

//Import data and validators
import { signupValidator } from "../../utils/scripts/formValidate";
import { genders } from "../../utils/data/gender";
import { fakeRegister } from "../../utils/api/fake";

const isIos = Platform.OS === "ios";

const SignupScreen = () => {
  //Navigation handler
  const navigation = useNavigation();

  // State for managing the visibility of gender selection
  const [openGender, setOpenGender] = useState(false);

  // State for managing the visibility of the date picker
  const [showDatePicker, setShowDatePicker] = useState(false);

  // State for storing text to be displayed in the snackbar
  const [snackBarText, setSnackBarText] = useState("");

  // State for managing the visibility of the snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // State object to manage user data
  const [userData, setUserData] = useState({
    id: "", // User ID
    firstName: "בני", // User's first name
    lastName: "חנונוב", // User's last name
    gender: "male", // User's gender
    birthday: new Date(), // User's birthday (initialized to current date)
    email: "benyx13@gmail.com", // User's email address
    password: "Aa123456", // User's password
    confirm: "Aa123456", // Confirmation of user's password
  });

  // Check if the app runs on iPhone
  useEffect(() => {
    // If the app runs on iPhone, show the date picker
    if (isIos) {
      setShowDatePicker(true);
    }
  }, []);

  // Function to handle date selection
  const handleDateSelection = (event, selectedDate) => {
    // If the app doesn't run on iPhone, hide the date picker
    if (!isIos) {
      setShowDatePicker(false);
    }
    // Get the selected date or use the current user's birthday
    const currentDate = selectedDate || userData.birthday;
    // Update the user data with the selected date
    setUserData({ ...userData, birthday: currentDate });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Validate the user data using signupValidator
    const formCheck = signupValidator(userData);

    // If the form validation fails
    if (formCheck.isValid === false) {
      // Set snackbar text to display the error message
      setSnackBarText(formCheck.errorMessage);
      // Open the snackbar
      setSnackbarOpen(true);

      // Close the snackbar after 3 seconds
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
      return;
    }

    // Generate a unique ID for the user data and Save user data
    setUserData({ ...userData, id: uuid.v4() });
    const isUserSaved = await saveUser();
    if (isUserSaved) {
      navigation.navigate("Image");
    }
  };

  // Function to save user data (supposed to interact with an API)
  const saveUser = async () => {
    try {
      const tokenData = fakeRegister(userData);
      const token = tokenData._j;
      if (token.status) {
        SecureStore.setItem("token", JSON.stringify(token.value));
      }
      return true;
    } catch (error) {
      console.error("Error saving user data:", error);
      return false;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <GoBackButton
        onPress={() => {
          navigation.navigate("Signin");
        }}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <BigText text={"הצטרף לחוויה שלנו"} />
          <RegularText
            text={
              "בלה בלה בלה חוויה יחודית שלנו שתתן לך ביצועים מצויינים עם פיצרים פגז בלה בלה בלה"
            }
          />
        </View>

        <View style={styles.formScroll}>
          <ScrollView>
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
          </ScrollView>
        </View>

        {isIos ? null : (
          <TouchableOpacity
            onPress={() => {
              setShowDatePicker(true);
            }}
          >
            <RegularText
              text={`${userData.birthday.getUTCFullYear()}-${
                userData.birthday.getMonth() + 1
              }-${userData.birthday.getDate()}`}
            />
          </TouchableOpacity>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={userData.birthday}
            onChange={handleDateSelection}
          />
        )}

        <View style={styles.input}>
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

        <RegularButton text={"הירשם"} onPress={handleSubmit} />
      </View>

      <Snackbar
        visible={snackbarOpen}
        onDismiss={() => {}}
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
  formScroll: {
    height: 300,
  },
});

export default SignupScreen;
