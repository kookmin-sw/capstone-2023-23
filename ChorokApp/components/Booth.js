import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { setDeviceId, setDeviceName } from "../store/store";

export default function Booth(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const deviceName = props.boothInfo.deviceName;
  const deviceId = props.boothInfo.deviceId;
  const humidity = props.boothInfo.humidity;
  const plantName = props.boothInfo.plantName;
  const plantSpecies = props.boothInfo.plantSpecies;
  const soilMoisture = props.boothInfo.soilMoisture;
  const temperature = props.boothInfo.temperature;
  const onPressHandler = () => {
    dispatch(setDeviceId(deviceId)); // deviceId로 업데이트
    dispatch(setDeviceName(deviceName)); // deviceId로 업데이트
    navigation.navigate("Plant");
  };

  return (
    <TouchableOpacity style={styles.boxContainer} onPress={onPressHandler}>
      <Text
        style={[
          styles.boothText,
          {
            color: "white",
            fontSize: hp("3.5%"),
            fontFamily: "comfortaa-bold",
          },
        ]}
      >
        {deviceName}
      </Text>
      <Text
        style={[
          styles.boothText,
          { color: "white", fontSize: hp("2%"), marginBottom: hp("2%") },
        ]}
      >
        ID : {deviceId}
      </Text>
      <View style={styles.plantInfo}>
        {plantName && (
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "flex-start",
              paddingVertical: hp("2%"),
            }}
          >
            <View style={styles.boothBox}>
              <View
                style={[
                  styles.TextBox,
                  { backgroundColor: "rgba(0,0,0,0.1)", paddingLeft: 5 },
                ]}
              >
                <Text style={styles.boothText}>식물 이름</Text>
              </View>
              <View style={[styles.TextBox, { alignItems: "center" }]}>
                <Text style={styles.boothText}>{plantName}</Text>
              </View>
            </View>
            <View style={styles.boothBox}>
              <View
                style={[
                  styles.TextBox,
                  { backgroundColor: "rgba(0,0,0,0.1)", paddingLeft: 5 },
                ]}
              >
                <Text style={styles.boothText}>식물 종</Text>
              </View>
              <View style={[styles.TextBox, { alignItems: "center" }]}>
                <Text style={styles.boothText}>{plantSpecies}</Text>
              </View>
            </View>
            <View style={styles.boothBox}>
              <View
                style={[
                  styles.TextBox,
                  { backgroundColor: "rgba(0,0,0,0.1)", paddingLeft: 5 },
                ]}
              >
                <Text style={styles.boothText}>설정 습도</Text>
              </View>
              <View style={[styles.TextBox, { alignItems: "center" }]}>
                <Text style={styles.boothText}>{humidity}%</Text>
              </View>
            </View>
            <View style={styles.boothBox}>
              <View
                style={[
                  styles.TextBox,
                  { backgroundColor: "rgba(0,0,0,0.1)", paddingLeft: 5 },
                ]}
              >
                <Text style={styles.boothText}>설정 온도</Text>
              </View>
              <View style={[styles.TextBox, { alignItems: "center" }]}>
                <Text style={styles.boothText}>{temperature}℃</Text>
              </View>
            </View>
            <View style={styles.boothBox}>
              <View
                style={[
                  styles.TextBox,
                  { backgroundColor: "rgba(0,0,0,0.1)", paddingLeft: 5 },
                ]}
              >
                <Text style={styles.boothText}>설정 토양습도</Text>
              </View>
              <View style={[styles.TextBox, { alignItems: "center" }]}>
                <Text style={styles.boothText}>{soilMoisture}%</Text>
              </View>
            </View>
          </View>
        )}
        {!plantName && (
          <View
            style={{
              flex: 1,
              backgroundColor: "teal",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              backgroundColor: "rgb(254,241,239)",
              width: "90%",
              margin: 20,
            }}
          >
            <Image
              source={require("../img/plus.png")}
              style={{
                width: wp("7%"),
                height: wp("7%"),
                resizeMode: "contain",
                marginBottom: 10,
              }}
            />
            <Text style={styles.boothText}>Please put any plants</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    width: wp("70%"),
    height: 400, // 고정값으로 변경
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(132,165,157)",
    margin: wp("2%"),
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  plantInfo: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("65%"),
    padding: wp("2%"),
    height: 250,
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  boothText: {
    fontSize: hp("2.5%"),
    fontWeight: "500",
    fontFamily: "comfortaa-regular",
  },
  boothBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    marginBottom: hp(1),
  },
  TextBox: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 5,
    paddingBottom: 2,
  },
});
