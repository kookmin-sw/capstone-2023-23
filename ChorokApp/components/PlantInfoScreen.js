import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setPlant } from "../store/store";
import axios from "axios";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function PlantInfoScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const deviceId = useSelector((state) => state.device.deviceId);
  console.log("device Id : ", deviceId);
  const [showButton, setShowButton] = useState(false);
  const [buttonScale] = useState(new Animated.Value(0));
  const [plantInfo, setPlantInfo] = useState({
    plantName: "",
    plantSpecies: "",
    temp: "",
    humidity: "",
    soilMoist: "",
  });
  const [headerImageUri, setHeaderImageUri] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  // console.log("plant : ", plantInfo.plantName, plantInfo.plantSpecies);
  const onPressHandler = () => {
    const plantName = plantInfo.plantName;
    const plantSpecies = plantInfo.plantSpecies;
    const temp = plantInfo.temp;
    const humidity = plantInfo.humidity;
    const soilMoist = plantInfo.soilMoist;
    dispatch(setPlant({ plantName, plantSpecies, temp, humidity, soilMoist }));
    navigation.navigate("DataScreen");
  };

  async function fetchData() {
    try {
      const url = `http://3.38.62.245:8080/device/load/one?deviceId=${deviceId}`;
      const url2 = `http://3.38.62.245:8080/dataout/total?deviceId=${9878283}`;
      const response2 = await axios.get(url2);
      const response = await axios.get(url);
      console.log("url1 : ", response.data);
      console.log("url2 : ", response2.data);
      setPlantInfo({
        humidity: response.data.humidity,
        soilMoist: response.data.soilMoisture,
        plantName: response.data.plantName,
        plantSpecies: response.data.plantSpecies,
        temp: response.data.temperature,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchImage() {
    try {
      const imageUrl = `http://3.38.62.245:8080/dataout/image?deviceId=${1234}`;

      // Use axios to fetch the image as Blob data
      const response = await axios.get(imageUrl, {
        responseType: "blob",
      });
      const blobData = response.data;

      // Convert Blob data to Base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(",")[1]; // Extract base64 data without the data URL prefix

        // Build the data URL for the image
        const dataUrl = `data:image/jpeg;base64,${base64Data}`;
        // console.log(dataUrl);
        setHeaderImageUri(dataUrl);
      };

      // Read the Blob data as text
      reader.readAsDataURL(blobData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (deviceId) {
      fetchData();
      fetchImage();
    }
  }, [deviceId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
      fetchImage();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: hp(6.5),
          left: wp(7),
          zIndex: 1,
          backgroundColor: "white",
          borderRadius: wp(5),
          padding: wp(2),
          width: wp("30%"),
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.subText}>DeviceId {deviceId}</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        {headerImageUri ? (
          <Image
            source={{ uri: headerImageUri }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.TextContainer}>
          <View style={styles.TitleContainer}>
            {plantInfo.plantName ? (
              <View style={{ flex: 1 }}>
                <Text style={styles.bidText}>{plantInfo.plantName}</Text>
                <Text style={styles.subText}>{plantInfo.plantSpecies}</Text>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                {/* <View style={styles.underline}></View> */}
                <Text style={styles.bidText}>Add plant</Text>
                {/* <View style={styles.underline}></View> */}
              </View>
            )}
            {plantInfo.plantName && (
              <View style={styles.BtnContainer}>
                <View style={styles.BtnBox}>
                  <TouchableOpacity onPress={onPressHandler}>
                    <Text
                      style={[
                        styles.subText,
                        { color: "white", fontFamily: "comfortaa-bold" },
                      ]}
                    >
                      For Detail
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          <View style={styles.DataContainer}>
            {plantInfo.plantName && (
              <View style={[styles.DataBox1, {}]}>
                <View style={[styles.DataBoxContainer]}>
                  <View style={[styles.DataBoxImage, { marginRight: 3 }]}>
                    <Image
                      source={require("../img/temp.png")}
                      style={{
                        resizeMode: "cover",
                        height: wp("20%"),
                        width: wp("40%"),
                        marginRight: 10,
                      }}
                    />
                  </View>
                  <View stlye={styles.DataBoxText}>
                    <Text style={styles.midText}>온도</Text>
                    <Text style={styles.subText}>{plantInfo.temp}</Text>
                  </View>
                </View>
                <View style={styles.DataBoxContainer}>
                  <View style={[styles.DataBoxImage, { marginLeft: 1 }]}>
                    <Image
                      source={require("../img/water.png")}
                      style={{
                        resizeMode: "cover",
                        height: wp("20%"),
                        width: wp("34%"),
                        marginLeft: 10,
                      }}
                    />
                  </View>
                  <View stlye={styles.DataBoxText}>
                    <Text style={styles.midText}>습도</Text>
                    <Text style={styles.subText}>{plantInfo.humidity}</Text>
                  </View>
                </View>
              </View>
            )}
            {plantInfo.plantName && (
              <View style={styles.DataBox1}>
                <View style={styles.DataBoxContainer}>
                  <View style={styles.DataBoxImage}>
                    <Image
                      source={require("../img/soil.png")}
                      style={{
                        resizeMode: "cover",
                        height: wp("20%"),
                        width: wp("40%"),
                        marginLeft: 10,
                      }}
                    />
                  </View>
                  <View stlye={styles.DataBoxText}>
                    <Text style={[styles.midText]}>토양</Text>
                    <Text style={styles.subText}>{plantInfo.soilMoist}</Text>
                  </View>
                </View>
                <View style={styles.DataBoxContainer}>
                  <View
                    style={[
                      styles.DataBoxImage,
                      { marginBottom: 5, marginLeft: 6 },
                    ]}
                  >
                    <Image
                      source={require("../img/light.png")}
                      style={{
                        resizeMode: "cover",
                        height: wp("20%"),
                        width: wp("40%"),
                        marginLeft: 10,
                      }}
                    />
                  </View>
                  <View stlye={styles.DataBoxText}>
                    <Text style={[styles.midText]}>조명</Text>
                  </View>
                </View>
              </View>
            )}
            {!plantInfo.plantName && (
              <View style={styles.DataBox1}>
                <View style={styles.DataBoxContainer}>
                  <View stlye={styles.DataBoxText}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("AddPlant")}
                    >
                      <Image
                        source={require("../img/plus.png")}
                        style={{
                          width: wp("15%"),
                          height: wp("15%"),
                          resizeMode: "contain",
                          marginTop: hp("-6%"),
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,1)",
  },
  header: {
    flex: 0.65,
    flexDirection: "row",
    backgroundColor: "rgb(242,242,242)",
    marginBottom: hp("-4%"),
    alignItems: "flex-end",
  },
  headerImage: {
    flex: 1,
    resizeMode: "contain",
  },
  TextContainer: {
    flex: 1,
  },
  TitleContainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: wp("4%"),
    backgroundColor: "rgb(240,240,240)",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  BtnContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 20,
  },
  BtnBox: {
    flex: 1,
    backgroundColor: "rgb(47,109,96)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: hp("2%"),
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  DataContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  DataBox1: {
    flex: 1,
    flexDirection: "row",
  },
  DataBox2: {
    flex: 1,
    flexDirection: "row",
  },
  DataBoxContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp("4%"),
    backgroundColor: "rgb(240,240,240)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  DataBoxImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp("5%"),
  },
  DataBoxImageContent: {
    resizeMode: "contain",
    width: "80%",
    height: "80%",
  },
  DataBoxText: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  bidText: {
    fontSize: hp("3.2%"),
    fontWeight: "500",
    fontFamily: "comfortaa-bold",
  },
  underline: {
    width: wp(40),
    height: 1,
    marginTop: 1,
    backgroundColor: "rgb(129,186,170)",
    color: "rgb(129,186,170)",
  },
  midText: {
    fontSize: hp("2.4%"),
    fontWeight: "500",
    fontFamily: "comfortaa-medium",
  },
  subText: {
    fontSize: hp("2.4%"),
    fontWeight: "500",
    fontFamily: "comfortaa-medium",
  },
  content: {
    flex: 0.35,
    borderTopLeftRadius: hp("5%"),
    borderTopRightRadius: hp("5%"),
    backgroundColor: "rgba(230,230,230, 1)",
    padding: hp("2%"),
    paddingHorizontal: wp("8%"),
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 4,
  },
});
