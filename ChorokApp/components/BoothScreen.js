import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./Loader";
import Booth from "./Booth";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function BoothScreen() {
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState("");
  const [boothList, setBoothList] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태를 저장하는 상태 변수
  const [fetchError, setFetchError] = useState(false); // 요청 에러 여부를 저장하는 상태 변수
  const [retryCount, setRetryCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // ADD버튼의 동작 여부를 저장하는 상태 변수
  const rotationValue = useState(new Animated.Value(0))[0]; // 애니메이션을 위한 변수
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const navigation = useNavigation();
  const addBooth = (booth) => {
    setBoothList([...boothList, booth]);
  };

  //버튼을 눌렀을 때
  const handlePress = () => {
    setIsOpen(!isOpen);
    Animated.timing(rotationValue, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    if (isOpen) {
      setOverlayOpacity(1); // Overlay가 닫힐 때 다른 컴포넌트들의 투명도를 복원
    } else {
      setOverlayOpacity(0.1); // Overlay가 열릴 때 다른 컴포넌트들의 투명도를 낮춤
    }
  };
  // 애니메이션을 위한 변수들
  const rotateInterpolate = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const boxStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem("user_id");
        setUserId(userId);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();

    fetchData(); // fetchData 함수를 호출하여 초기 데이터 요청

    // 컴포넌트가 언마운트될 때 요청 에러 상태 초기화
    return () => {
      setFetchError(false);
    };
  }, []); // 빈 배열을 의존성 배열로 전달하여 첫 번째 useEffect가 마운트 시에만 실행되도록 함

  useEffect(() => {
    // 요청 에러가 발생했을 경우, 일정 시간 후에 다시 fetchData 함수 호출
    if (fetchError) {
      const timer = setTimeout(fetchData, 3000);
      return () => clearTimeout(timer);
    }
  }, [fetchError]);

  async function fetchData() {
    try {
      const url = `http://3.38.62.245:8080/device/load/all?userId=${userId}`;
      setLoading(true); // 로딩 상태를 true로 설정
      setFetchError(false); // 요청 에러 상태 초기화
      const response = await axios.get(url);
      console.log(response.data);
      setBoothList(response.data);
    } catch (error) {
      console.error(error);
      setFetchError(true); // 요청 에러 상태를 true로 설정
    } finally {
      setLoading(false); // 로딩 상태를 false로 설정
      console.log("Loading is false");
    }
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  if (loading) {
    console.log("Loader is working");
    return <Loader />; // 로딩 중일 때 Loader 컴포넌트를 반환
  }

  const renderItem = ({ item }) => (
    <Booth key={item.deviceName} boothInfo={item} />
  );

  const handleOverlayDismiss = () => {
    if (isOpen) {
      setIsOpen(false);
      handlePress();
    }
  };
  const addPressEvent = () => {
    navigation.navigate("Add");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { opacity: overlayOpacity }]}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Device List</Text>
          <Text style={styles.subHeaderText}>
            You Have {boothList.length} Booth in your account!
          </Text>
        </View>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity onPress={handlePress}>
            <Animated.View style={[styles.addButton, boxStyle]}>
              <Image
                source={require("../img/plus.png")}
                style={styles.addButtonImage}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.content, { opacity: overlayOpacity }]}>
        <FlatList
          data={boothList}
          numColumns={1}
          renderItem={renderItem}
          keyExtractor={(item) => item.deviceName}
          contentContainerStyle={styles.boothContainer}
        />
      </View>
      {isOpen && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <View
              style={{
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 5,
                marginVertical: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={addPressEvent}
              >
                <Image
                  source={require("../img/plus.png")}
                  style={{
                    resizeMode: "contain",
                    width: wp("2%"),
                    height: hp("2%"),
                    marginRight: 10,
                  }}
                />
                <Text style={styles.addText}>ADD YOUR DEVICE</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../img/plus.png")}
                  style={{
                    resizeMode: "contain",
                    width: wp("2%"),
                    height: hp("2%"),
                    marginRight: 10,
                  }}
                />
                <Text style={styles.addText}>DELETE YOUR DEVICE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 0.25,
    flexDirection: "row",
    backgroundColor: "rgba(254,241,239, 0.9)",
    marginBottom: hp("-3%"),
    borderBottomEndRadius: hp("100%"),
    borderBottomStartRadius: hp("40%"),
    alignItems: "flex-end",
  },
  headerTextContainer: {
    flex: 2,
    padding: hp("2%"),
    marginLeft: hp("2%"),
    marginBottom: hp("2%"),
  },
  headerText: {
    fontSize: hp("3.2%"),
    fontWeight: "500",
    fontFamily: "comfortaa-bold",
  },
  subHeaderText: {
    fontSize: hp("1.6%"),
    fontWeight: "500",
    fontFamily: "comfortaa-medium",
  },
  addButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: 35,
    height: 35,
    marginTop: hp("4%"),
    backgroundColor: "rgba(129,186,170, 0.6)",
    borderRadius: 100,
    padding: 10,
    marginBottom: hp("5%"),
    alignItems: "center",
  },
  addButtonImage: {
    resizeMode: "contain",
    flex: 1,
  },
  addText: {
    fontSize: hp("2%"),
    fontWeight: "500",
    fontFamily: "comfortaa-bold",
  },
  content: {
    flex: 1,
  },
  boothContainer: {
    flexGrow: 1,
    marginLeft: wp("3%"),
    marginRight: wp("3%"),
    padding: 20,
    paddingTop: 0,
    justifyContent: "space-between",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    bottom: hp("69%"),
    left: 0,
    right: 0,
    top: hp("16%"),
    alignItems: "flex-end",
    marginHorizontal: hp("4%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  overlayContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
});
