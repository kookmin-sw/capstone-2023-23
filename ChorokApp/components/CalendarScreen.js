import React, { useEffect, useState, createRef } from "react";
import {
  Image,
  View,
  Modal,
  Text,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native";
export default function CalendarScreen() {
  const [markedDates, setMarkderDates] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [dayData, setDayData] = useState([]);
  const [content, setContent] = useState("");
  const [uri, setUri] = useState(null);
  const [isWriting, setIsWriting] = useState(false);

  const contentRef = createRef();

  const handleDayPress = async (day) => {
    setSelectedDate(day.dateString);
    console.log(selectedDate);
    const [year, month, date] = day.dateString.split("-"); // 년, 월, 일로 분할하여 저장
    const parsedMonth = parseInt(month, 10); // 월을 정수형으로 변환
    const parsedDate = parseInt(date, 10); // 일을 정수형으로 변환
    setMonth(parsedMonth);
    setDate(parsedDate);
    setModalVisible(true);
    const url = `http://3.38.62.245:8080/dataout/record?deviceId=1234&date=${day.dateString}`;
    const imageUrl = `http://3.38.62.245:8080/dataout/imageC?deviceId=${1234}&year=${year}&month=${parsedMonth}&day=${parsedDate}`;
    const response2 = await axios.get(imageUrl);
    const response = await axios.get(url);
    const data = response.data;
    const base64Image = response2.data;
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;
    setUri(dataUrl);
    setDayData(data);
    console.log(dayData);
    // 데이터를 사용하여 필요한 작업 수행
    // 모달창에서 데이터를 보여줄 수 있음
    console.log("data : ", data.content);
  };

  const closeModal = () => {
    setModalVisible(false);
    setDayData([]);
    setUri(null);
  };
  const handleMonthChange = (month) => {
    setCurrentMonth(month.dateString);
    console.log(currentMonth);
  };
  async function fetchMonth() {
    try {
      const year = 2023;
      const month = "05";
      const url = `http://3.38.62.245:8080/dataout/marked?deviceId=${1234}&date=${year}-${month}`;

      const response = await axios.get(url);
      console.log(response.data);
      const data = response.data;
      const markedDates = {};
      data.forEach((date) => {
        markedDates[date] = { marked: true };
      });
      setMarkderDates(markedDates);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchMonth();
  }, []);
  const handleWritingPress = () => {
    setIsWriting(true);
  };

  const handleSubmit = async () => {
    if (content == "") {
      Alert.alert("content 입력하시오");
    } else {
      try {
        const url = `http://3.38.62.245:8080/datain/content?deviceId=${1234}&date=${selectedDate}&content=${content}`;
        const response = await axios.patch(url, {
          selectedDate: selectedDate,
          content: content,
        });
        console.log("Data Screen : ", response.data);
        setModalVisible(false);
        setIsWriting(false);
        setContent("");
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleContentChange = (text) => {
    setContent(text);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <Image style={{ width: 500, height: 500 }} source={{ uri: uri }} /> */}
      <View
        style={{
          flex: 0.4,
          backgroundColor: "rgba(254,241,239, 0.9)",
          marginBottom: hp("-10%"),
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
          Calendar
        </Text>
      </View>
      <View
        style={{ flex: 1, alignItems: "center", paddingHorizontal: wp("5%") }}
      >
        {/* <Text>Current Month: {currentMonth}</Text> */}
        <Calendar
          style={{
            width: wp("90%"),
            height: hp("60%"),
            backgroundColor: "rgba(0,0,0,0)",
          }}
          markedDates={markedDates}
          onDayPress={handleDayPress}
          onMonthChange={handleMonthChange}
        />
      </View>
      <Modal
        visible={modalVisible}
        onRequestClose={closeModal}
        animationType="slide"
      >
        <TouchableOpacity style={styles.backButton} onPress={closeModal}>
          <Image source={require("../img/back.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <View
          style={{
            flex: 0.4,
            backgroundColor: "rgba(254,241,239, 0.9)",
            justifyContent: "center",
            borderBottomEndRadius: hp("100%"),
            borderBottomStartRadius: hp("40%"),
            marginBottom: hp("-2%"),
          }}
        >
          <Text
            style={{
              fontSize: hp("3.2%"),
              marginLeft: hp("6%"),
              marginTop: hp("4%"),
              marginBottom: hp(2),
              fontWeight: "500",
              fontFamily: "comfortaa-bold",
            }}
          >
            Daily 📗
          </Text>
          <Text
            style={{
              fontSize: hp("1.6%"),
              marginLeft: hp("6%"),
              marginBottom: hp("2%"),
              fontWeight: "500",
              fontFamily: "comfortaa-bold",
              letterSpacing: 1,
              lineHeight: 22,
            }}
          >
            {month}월 {date}일 초록이입니다🪴{"\n"}그 날의 한줄평을 적어보세요.
          </Text>
        </View>
        <View
          style={{
            flex: 0.8,
            paddingHorizontal: wp("5%"),
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -1,
            },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 100,
          }}
        >
          {uri ? (
            <Image
              source={{ uri: uri }}
              style={{ width: "100%", height: "100%", borderRadius: 20 }}
            />
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
        <View style={{ flex: 0.7, padding: wp("5%") }}>
          <View style={{ flex: 0.4, flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgb(230,230,240)",
                borderRadius: 10,
                flexDirection: "row",
                margin: 5,
                marginTop: 0,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: -1,
                },
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: 4,
              }}
            >
              <Image
                source={require("../img/water.png")}
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: 13,
                  fontFamily: "comfortaa-light",
                  lineHeight: 20,
                }}
              >
                평균 습도 {dayData.humidity}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgb(239,230,231)",
                borderRadius: 10,
                flexDirection: "row",
                margin: 5,
                marginTop: 0,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: -1,
                },
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: 4,
              }}
            >
              <Image
                source={require("../img/temp.png")}
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: 13,
                  fontFamily: "comfortaa-light",
                  lineHeight: 20,
                }}
              >
                평균 온도 {dayData.temperature}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgb(240,234,229)",
                borderRadius: 10,
                flexDirection: "row",
                margin: 5,
                marginTop: 0,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: -1,
                },
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: 4,
              }}
            >
              <Image
                source={require("../img/soil.png")}
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: 13,
                  fontFamily: "comfortaa-light",
                  lineHeight: 20,
                }}
              >
                평균 온도 {dayData.soilMoisture}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgb(239,239,239)",
              margin: 5,
              borderRadius: 10,
              padding: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: -1,
              },
              shadowOpacity: 0.3,
              shadowRadius: 3,
              elevation: 4,
            }}
          >
            <View
              style={{
                flex: 0.2,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "comfortaa-light",
                  paddingLeft: 10,
                  marginBottom: 3,
                }}
              >
                How was your day?
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "rgb(132,165,157)",
                  paddingRight: 10,
                  borderRadius: 5,
                  marginRight: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 3,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: -1,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 2,
                }}
                onPress={handleWritingPress}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "comfortaa-light",
                    paddingLeft: 10,
                    marginBottom: 3,
                    color: "white",
                  }}
                >
                  일기 쓰기
                </Text>
              </TouchableOpacity>
            </View>
            {isWriting ? (
              // 편집 모드인 경우 TextInput 사용
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: 10,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: -1,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 4,
                }}
                value={content}
                onChangeText={handleContentChange}
                returnKeyType="done"
              />
            ) : (
              // 편집 모드가 아닌 경우 일기 내용 출력
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: 10,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: -1,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "comfortaa-light",
                    paddingLeft: 10,
                    marginBottom: 3,
                  }}
                >
                  {dayData.content}
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "rgb(132,165,157)",
              borderRadius: 10,
              width: "100%",
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 3,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: -1,
              },
              shadowOpacity: 0.3,
              shadowRadius: 3,
              elevation: 2,
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontWeight: "600",
                fontFamily: "comfortaa-regular",
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: hp(2),
    left: wp(7),
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: wp(5),
    padding: wp(2),
  },
  backIcon: {
    width: wp(5),
    height: wp(5),
    resizeMode: "contain",
  },
});
