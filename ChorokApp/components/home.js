import React, { useRef, useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { TouchableOpacity } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Home = () => {
  const scrollViewRef = useRef(null);

  const scrollToMainBox = (index) => {
    if (scrollViewRef.current) {
      const x = index * SCREEN_WIDTH;
      scrollViewRef.current.scrollTo({ x, animated: true });
    }
  };

  return (
    <ImageBackground
      // source={require("../img/home_background.jpg")}
      style={styles.container}
      imageStyle={{ opacity: 0.8 }}
    >
      <View
        style={{
          flex: 0.4,
          backgroundColor: "rgba(254,241,239, 0.9)",
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
          About Us
        </Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mainContainer}
      >
        <View style={styles.mainBox}>
          <ImageBackground
            source={require("../img/main_background1.jpg")}
            style={styles.mainBoxContent}
            imageStyle={{ borderRadius: 16, opacity: 0.7 }}
          >
            <Text style={styles.plainFont}>
              Full Time Managed{"\n"} Plant Care Service
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.mainBox}>
          <ImageBackground
            source={require("../img/main_background3.jpg")}
            style={{
              flex: 1.2,
              justifyContent: "center",
              alignItems: "center",
            }}
            imageStyle={{ borderRadius: 16, opacity: 0.8 }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "70%",
              }}
            >
              <Text style={styles.plainFont}>
                Our Service can automatically manage all the environment in
                booth.
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.mainBox}>
          <ImageBackground
            source={require("../img/main_background2.jpg")}
            style={styles.mainBoxContent}
            imageStyle={{ borderRadius: 16, opacity: 0.7 }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "70%",
              }}
            >
              <Text style={styles.plainFont}>
                Anytime you want, you can view your plant and all the realtime
                environment information.
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.mainBox}>
          <ImageBackground
            source={require("../img/main_background4.jpg")}
            style={styles.mainBoxContent}
            imageStyle={{ borderRadius: 16, opacity: 0.7 }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "70%",
              }}
            >
              <Text style={styles.plainFont}>
                If there are any unexpected event, we will alert you about the
                event.
              </Text>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>

      <View style={styles.howBox}>
        <View style={{ marginBottom: hp("-1%") }}>
          <Text
            style={{
              fontSize: hp("3.2%"),
              marginTop: hp("1%"),
              marginLeft: hp("1%"),
              marginBottom: hp("2%"),
              fontWeight: "500",
              fontFamily: "comfortaa-bold",
            }}
          >
            For More
          </Text>
        </View>
        <ImageBackground
          source={require("../img/main_background5.jpg")}
          style={styles.mainBoxContent2}
          imageStyle={{
            borderRadius: 16,
            opacity: 0.7,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <TouchableOpacity
            style={styles.howBtn}
            onPress={() => scrollToMainBox(1)}
          >
            <Image
              source={require("../img/curData.png")}
              style={{ resizeMode: "contain", width: wp("20%") }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.howBtn}
            onPress={() => scrollToMainBox(2)}
          >
            <Image
              source={require("../img/set.png")}
              style={{ resizeMode: "contain", width: wp("20%") }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.howBtn}
            onPress={() => scrollToMainBox(3)}
          >
            <Image
              source={require("../img/light.png")}
              style={{
                resizeMode: "contain",
                width: wp("25%"),
                marginLeft: hp("-1%"),
              }}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContainer: {},
  mainBox: {
    width: SCREEN_WIDTH,
    padding: 40,
    paddingTop: 0,
    paddingBottom: 0,
  },
  howBox: {
    flex: 0.5,
    padding: 40,
    paddingTop: 0,
    paddingBottom: 0,
  },
  howBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  mainBoxContent: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    paddingBottom: 30,
  },
  mainBoxContent2: {
    flex: 1.2,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 30,
    paddingBottom: 30,
  },
  imageContainer: {
    flex: 1,
  },
  smallFont2: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "comfortaa-medium",
  },
  plainFont: {
    fontSize: 24,
    color: "rgb(45, 87, 76)",
    fontWeight: "600",
    fontFamily: "comfortaa-bold",
  },
});

export default Home;
