import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const LogoutScreen = () => {
  const navigation = useNavigation();
  const [animating, setAnimating] = useState(true);
  const [showBtnBox, setShowBtnBox] = useState(false);
  const btnBoxAnimation = useRef(new Animated.Value(0)).current;
  const [userName, setUserName] = useState(null);
  const [buttonHeight, setButtonHeight] = useState(null);

  const handleTextLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setButtonHeight(height);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user_name = await AsyncStorage.getItem("user_firstname");
        setUserName(user_name || null);
      } catch (error) {
        // 오류 처리
        console.log(error);
      }
    };

    const timer = setTimeout(() => {
      setShowBtnBox(true);
    }, 3000);

    if (!userName) {
      getUserInfo();
    }

    return () => clearTimeout(timer);
  }, [userName]);

  useEffect(() => {
    if (showBtnBox) {
      Animated.timing(btnBoxAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [showBtnBox]);
  const handleStart = async () => {
    AsyncStorage.getItem("user_email").then((value) =>
      navigation.replace(value === null ? "Auth" : "Main")
    );
  };
  const handleSignUp = async () => {
    navigation.navigate("Auth", { screen: "Register" });
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {showBtnBox && <View style={{ flex: 0.7 }}></View>}
        <Image
          source={require("../img/logo.jpeg")}
          style={{
            width: 300,
            height: 300,
            resizeMode: "contain",
            marginBottom: hp("-10%"),
          }}
        />
        {!showBtnBox && (
          <Text style={styles.plainFont}>Don't Starve, Chorok</Text>
        )}
      </View>
      {showBtnBox && (
        <Animated.View
          style={[
            styles.btnBox,
            {
              transform: [
                {
                  translateY: btnBoxAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [200, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {!userName && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: hp("4%"),
              }}
            >
              <Text
                style={[
                  styles.plainFont,
                  {
                    color: "black",
                    fontSize: 20,
                    lineHeight: 35, // 행간 조절
                    letterSpacing: 1,
                  },
                ]}
              >
                &nbsp;Welcome! We will help you{"\n"}to take care of your
                plants!
              </Text>
            </View>
          )}
          {!userName && (
            <TouchableOpacity
              style={{
                backgroundColor: "rgb(50,110,97)",
                borderRadius: 30,
                width: "75 %",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: hp("2%"),
              }}
              onPress={handleSignUp}
            >
              <Text
                style={[styles.plainFont, { color: "white", paddingBottom: 2 }]}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              backgroundColor: "rgb(129,184,168)",
              borderRadius: 30,
              width: "75%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
            onPress={handleStart}
          >
            <Text
              style={[styles.plainFont, { color: "white", paddingBottom: 2 }]}
            >
              {userName === null ? "Log In" : `Welcome Again!`}
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 2 }}></View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  imageContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp("-5%"),
  },
  btnBox: {
    flex: 4,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  plainFont: {
    fontSize: 24,
    color: "rgb(45, 87, 76)",
    fontWeight: "600",
    fontFamily: "comfortaa-regular",
  },
});

// rgb(89, 100, 51)

export default LogoutScreen;
