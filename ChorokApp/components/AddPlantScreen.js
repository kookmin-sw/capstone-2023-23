import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { createRef, useState } from "react";
import axios from "axios";

export default function AddPlantScreen() {
  const navigation = useNavigation();
  const deviceId = useSelector((state) => state.device.deviceId);
  const [humidity, setHumidity] = useState("");
  const [soilMoisture, setSoilMoisture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [plantName, setPlantName] = useState("");
  const [plantSpecies, setPlantSpecies] = useState("");

  const deviceIdRef = createRef();
  const humidityRef = createRef();
  const soilMoistureRef = createRef();
  const temperatureRef = createRef();
  const plantNameRef = createRef();
  const plantSpeciesRef = createRef();

  const handleSubmit = async () => {
    try {
      const url = `http://3.38.62.245:8080/device/register/plant?deviceId=${deviceId}`;
      const response = await axios.patch(url, {
        deviceId: deviceId,
        humidity: humidity,
        soilMoisture: soilMoisture,
        temperature: temperature,
        plantName: plantName,
        plantSpecies: plantSpecies,
      });
      console.log("addPlant", response.data);
      navigation.navigate("PlantInfoScreen");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={require("../img/back.png")} style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text
          style={[
            styles.headerText,
            { paddingLeft: wp("10%"), paddingBottom: hp("4%") },
          ]}
        >
          Add Plant
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.smallFont2}>plant name</Text>
        <TextInput
          style={styles.formBox}
          placeholder="Plant Name"
          value={plantName}
          ref={plantNameRef}
          onChangeText={(plantName) => setPlantName(plantName)}
          onSubmitEditing={() =>
            plantSpeciesRef.current & plantSpeciesRef.current.focus()
          }
          returnKeyType="next"
        />
        <Text style={styles.smallFont2}>plant species</Text>
        <TextInput
          style={styles.formBox}
          placeholder="Plant Species"
          value={plantSpecies}
          ref={plantSpeciesRef}
          onChangeText={(plantSpecies) => setPlantSpecies(plantSpecies)}
          onSubmitEditing={() =>
            humidityRef.current & humidityRef.current.focus()
          }
          returnKeyType="next"
        />
        <Text style={styles.smallFont2}>humidity</Text>
        <TextInput
          style={styles.formBox}
          placeholder="Humidity"
          value={humidity}
          ref={humidityRef}
          onChangeText={(humidity) => setHumidity(humidity)}
          onSubmitEditing={() =>
            soilMoistureRef.current & soilMoistureRef.current.focus()
          }
          returnKeyType="next"
        />
        <Text style={styles.smallFont2}>soil moisture</Text>
        <TextInput
          style={styles.formBox}
          placeholder="Soil Moisture"
          value={soilMoisture}
          ref={soilMoistureRef}
          onChangeText={(soilMoisture) => setSoilMoisture(soilMoisture)}
          onSubmitEditing={() =>
            temperatureRef.current & temperatureRef.current.focus()
          }
          returnKeyType="next"
        />
        <Text style={styles.smallFont2}>temperature</Text>
        <TextInput
          style={styles.formBox}
          placeholder="Temperature"
          value={temperature}
          ref={temperatureRef}
          onChangeText={(temperature) => setTemperature(temperature)}
          returnKeyType="done"
        />
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
            paddingEnd: wp("3%"),
          }}
        >
          <TouchableOpacity onPress={handleSubmit} style={styles.btnBox}>
            <Text style={styles.smallFont}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: hp(6.5),
    left: wp(7),
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: wp(5),
    padding: wp(2),
  },
  backIcon: {
    width: wp(5),
    height: wp(5),
    resizeMode: "contain",
  },
  header: {
    flex: 1.5,
    backgroundColor: "rgba(254,241,239, 0.9)",
    paddingTop: hp("5%"),
    paddingHorizontal: wp("5%"),
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 200,
    justifyContent: "flex-end",
  },
  body: {
    flex: 5,
    marginTop: hp("2%"),
    paddingHorizontal: wp("7%"),
    marginHorizontal: wp("8.5%"),
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  footer: {
    flex: 2,
  },
  headerText: {
    fontSize: hp("4.5%"),
    fontWeight: "500",
    fontFamily: "comfortaa-bold",
  },
  formBox: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: hp("1%"),
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    fontSize: 13,
    fontFamily: "comfortaa-light",
  },
  btnBox: {
    paddingHorizontal: wp("6%"),
    paddingVertical: 10,
    backgroundColor: "orange",
    borderRadius: 10,
    backgroundColor: "rgb(50,110,97)",
  },
  smallFont: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "comfortaa-medium",
    color: "white",
  },
  smallFont2: {
    fontSize: 13,
    fontFamily: "comfortaa-light",
    paddingLeft: 10,
    marginBottom: hp("-0.5%"),
  },
});
