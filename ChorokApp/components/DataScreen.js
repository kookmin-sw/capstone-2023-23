import React, { createRef, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Back from "./Back";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DataScreen = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [curData, setCurData] = useState([]);
  const deviceId = useSelector((state) => state.device.deviceId);
  const plantName = useSelector((state) => state.plant.plantName);
  const plantSpecies = useSelector((state) => state.plant.plantSpecies);
  const tempHumidity = useSelector((state) => state.plant.humidity);
  const tempTemp = useSelector((state) => state.plant.temp);
  const tempSoilMoist = useSelector((state) => state.plant.soilMoist);
  const navigation = useNavigation();
  console.log(
    "Redux Check  : ",
    tempHumidity,
    " ",
    tempSoilMoist,
    " ",
    tempTemp
  );
  const [humidity, setHumidity] = useState("");
  const [soilMoisture, setSoilMoisture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [isChart, setIsChart] = useState(false);
  const [isData, setIsData] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const humidityRef = createRef();
  const soilMoistureRef = createRef();
  const temperatureRef = createRef();

  const chartPress = () => {
    if (isChart == false) setIsChart(true);
    else setIsChart(false);
  };
  const dataPress = () => {
    if (isData == false) setIsData(true);
    else setIsData(false);
  };
  const changePress = () => {
    if (isChange == false) setIsChange(true);
    else setIsChange(false);
  };
  useEffect(() => {
    fetchData();
    setHumidity(tempHumidity);
    setTemperature(tempTemp);
    setSoilMoisture(tempSoilMoist);
    // console.log("useEffect", curData);
  }, []);

  const fetchData = async () => {
    const deviceId = 1234;
    const url = `http://3.38.62.245:8080/dataout/total?deviceId=${deviceId}`;
    const url2 = `http://3.38.62.245:8080/dataout/recent?deviceId=${deviceId}`;
    try {
      const response = await axios.get(url);
      const response2 = await axios.get(url2);
      const data = response.data;
      const data2 = response2.data;
      console.log(" device : ", data2);
      const maxIndex = data.length - 1;
      let updateData = data2;

      //   console.log(data);
      //   console.log("update Data : ", updateData);
      const colorMap = {
        humidity: {
          color: "rgba(0, 191, 255, 1)",
          id: "Humidity",
        },
        temperature: {
          color: "rgba(255, 105, 180, 1)",
          id: "Temperature",
        },
        soilMoisture: {
          color: "rgba(255, 165, 0, 1)",
          id: "Soil Moisture",
        },
      };

      const chartData = {
        labels: Array.from({ length: 25 }, (_, i) => String(i)),
        datasets: [
          {
            data: Array.from({ length: 25 }, (_, i) => {
              const matchingData = data.find((item) => item.logTime === i);
              return matchingData ? matchingData.humidity : null;
            }),
            color: () => colorMap.humidity.color,
            strokeWidth: 2,
            pointLabel: ({ value }) => `${value} (Humidity)`,
            id: colorMap.humidity.id,
          },
          {
            data: Array.from({ length: 25 }, (_, i) => {
              const matchingData = data.find((item) => item.logTime === i);
              return matchingData ? matchingData.temperature : null;
            }),
            color: () => colorMap.temperature.color,
            strokeWidth: 2,
            pointLabel: ({ value }) => `${value} (Temperature)`,
            id: colorMap.temperature.id,
          },
          {
            data: Array.from({ length: 25 }, (_, i) => {
              const matchingData = data.find((item) => item.logTime === i);
              return matchingData ? matchingData.soilMoisture : null;
            }),
            color: () => colorMap.soilMoisture.color,
            strokeWidth: 2,
            pointLabel: ({ value }) => `${value} (Soil Moisture)`,
            id: colorMap.soilMoisture.id,
          },
        ],
      };
      setCurData(updateData);

      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!chartData) {
    return null;
  }

  const handleSubmit = async () => {
    if (soilMoisture === "" && temperature === "" && humidity === "") {
      Alert.alert("환경값을 하나라도 입력하세요.");
    } else {
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
        console.log("Data Screen : ", response.data);
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "rgb(254,245,229)",
        // backgroundColor: "white",
      }}
    >
      <Back />
      {/* <View style={{ flex: 0.4 }}></View> */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <TouchableOpacity style={[styles.circleBtn]} onPress={chartPress}>
          <Image
            source={require("../img/chart.png")}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        </TouchableOpacity>
        {isChart && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chartContainer}
          >
            <LineChart
              data={chartData}
              width={wp("170%")} // 적절한 너비로 조정
              height={hp("22%")}
              chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              bezier
              withInnerLines={false}
              withOuterLines={true}
              yOffset={-20} // 왼쪽으로 10만큼 이동
            />
          </ScrollView>
        )}
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity style={styles.circleBtn} onPress={dataPress}>
          <Image
            source={require("../img/curData.png")}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        </TouchableOpacity>
        {isData && (
          <View style={styles.dataContainer}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: "row",
              }}
            >
              <Text style={styles.plainFont}>Current Environment</Text>
            </View>
            <View style={styles.dataBox}>
              <Text style={styles.plainFont}>
                Temperature &nbsp;&nbsp;&nbsp;{curData.temperature.toFixed(0)}
              </Text>
            </View>
            <View style={styles.dataBox}>
              <Text style={styles.plainFont}>
                Humidity &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                {curData.humidity.toFixed(0)}
              </Text>
            </View>
            <View style={styles.dataBox}>
              <Text style={styles.plainFont}>
                Soil Moisture &nbsp; {curData.soilMoisture.toFixed(0)}
              </Text>
            </View>
          </View>
        )}
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity style={styles.circleBtn} onPress={changePress}>
          <Image
            source={require("../img/set.png")}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        </TouchableOpacity>
        {isChange && (
          <View style={[styles.envContainer]}>
            <View
              style={{
                flex: 0.3,
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
                flexDirection: "row",
              }}
            >
              <Text style={styles.plainFont}>Change Env</Text>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: "teal",
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  borderRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                <Text
                  style={[
                    styles.smallFont,
                    { color: "white", paddingBottom: 2 },
                  ]}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
              }}
            >
              <TextInput
                style={styles.formBox}
                placeholder="Temperature"
                value={temperature}
                ref={temperatureRef}
                onChangeText={(temperature) => setTemperature(temperature)}
                returnKeyType="next"
              />
              <TextInput
                style={styles.formBox}
                placeholder="Humidity"
                value={humidity}
                ref={humidityRef}
                onChangeText={(humidity) => setHumidity(humidity)}
                returnKeyType="next"
              />
              <TextInput
                style={styles.formBox}
                placeholder="Soil Moisture"
                value={soilMoisture}
                ref={soilMoistureRef}
                onChangeText={(soilMoisture) => setSoilMoisture(soilMoisture)}
                returnKeyType="done"
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default DataScreen;

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: "rgba(200,200,200, 0.5)",
  },
  dataContainer: {
    flex: 1,
    padding: 10,
    width: wp("70%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(227,227,227)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  envContainer: {
    flex: 1,
    width: wp("70%"),
    padding: 10,
    backgroundColor: "rgba(200,200,200, 0.5)",
    borderRadius: 10,
  },
  dataBox: {
    flex: 1,
    width: "70%",
    backgroundColor: "white",
    flexDirection: "column",
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgb(129,186,170)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  plainFont: {
    fontSize: 20,
    fontFamily: "comfortaa-medium",
  },
  smallFont: {
    fontSize: 15,
    fontFamily: "comfortaa-regular",
  },
  formBox: {
    flex: 1,
    width: wp("60%"),
    backgroundColor: "white",
    marginBottom: hp("1%"),
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 13,
    fontFamily: "comfortaa-light",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  circleBtn: {
    width: wp("18%"),
    height: wp("18%"),
    backgroundColor: "rgb(194,209,206)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
});
