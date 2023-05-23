import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Header from "./header";
import { useEffect, useState } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user_email = await AsyncStorage.getItem("user_email");
        const user_name = await AsyncStorage.getItem("user_firstname");
        setUserEmail(user_email);
        setUserName(user_name);
      } catch (error) {
        // 오류 처리
        console.log(error);
      }
    };
    getUserInfo();
  }, []);
  return (
    <ImageBackground
      style={styles.container}
      // source={require("../img/home_background.jpg")}
    >
      <View
        style={{
          flex: 0.25,
          backgroundColor: "rgba(254,241,239, 0.8)",
          marginBottom: hp("-3%"),
          borderBottomEndRadius: hp("100%"),
          borderBottomStartRadius: hp("40%"),
        }}
      >
        <Text
          style={{
            fontSize: hp("3.2%"),
            margin: hp("6%"),
            marginTop: hp("10%"),
            marginBottom: hp("2%"),
            fontWeight: "500",
            fontFamily: "comfortaa-bold",
          }}
        >
          {userName}
        </Text>
      </View>
      <View style={{ flex: 1, padding: 40 }}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              AsyncStorage.clear();
              navigation.replace("SplashScreen");
            }}
          >
            <Text style={{ color: "white", fontSize: wp(4.5) }}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loginBox: {
    width: SCREEN_WIDTH,
    padding: 40,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: wp(25),
    borderRadius: 400,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

export default ProfileScreen;
