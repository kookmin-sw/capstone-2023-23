import {
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, Button } from "react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import store from "./store/store";
import Home from "./components/home";
import ProfileScreen from "./components/ProfileScreen";
import SplashScreen from "./components/SplashScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import BoothScreen from "./components/BoothScreen";
import AddScreen from "./components/AddScreen";
import AddSuccess from "./components/AddSuccess";
import DataScreen from "./components/DataScreen";
import PlantInfoScreen from "./components/PlantInfoScreen";
import AddPlantScreen from "./components/AddPlantScreen";
import Loader from "./components/Loader";
import CalendarScreen from "./components/CalendarScreen";
import * as Font from "expo-font";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useEffect, useState } from "react";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "rgb(45, 87, 76)",
        tabBarActiveBackgroundColor: "transparent",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            const handlePress = () => {
              // 탭 클릭 시 동작할 코드
              navigation.navigate("Home"); // 다른 화면으로 이동
            };

            return (
              <Pressable
                style={[styles.circle, focused && styles.activeCircle]}
                onPress={handlePress}
              >
                <Image
                  source={require("./img/home.png")}
                  style={styles.footer}
                />
              </Pressable>
            );
          },
          tabBarLabel: "", // 글자 숨기기
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            const handlePress = () => {
              // 탭 클릭 시 동작할 코드
              navigation.navigate("Calendar"); // 다른 화면으로 이동
            };

            return (
              <Pressable
                style={[styles.circle, focused && styles.activeCircle]}
                onPress={handlePress}
              >
                <Image
                  source={require("./img/calender.png")}
                  style={styles.footer}
                />
              </Pressable>
            );
          },

          title: "Calendar",
          tabBarLabel: "", // 글자 숨기기
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Booth"
        component={BoothScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            const handlePress = () => {
              // 탭 클릭 시 동작할 코드
              navigation.navigate("Booth"); // 다른 화면으로 이동
            };

            return (
              <Pressable
                style={[styles.circle, focused && styles.activeCircle]}
                onPress={handlePress}
              >
                <Image
                  source={require("./img/Booth.png")}
                  style={styles.footer}
                />
              </Pressable>
            );
          },

          title: "Booth",
          tabBarLabel: "", // 글자 숨기기
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            const handlePress = () => {
              // 탭 클릭 시 동작할 코드
              navigation.navigate("Profile"); // 다른 화면으로 이동
            };

            return (
              <Pressable
                style={[styles.circle, focused && styles.activeCircle]}
                onPress={handlePress}
              >
                <Image
                  source={require("./img/user.png")}
                  style={styles.footer}
                />
              </Pressable>
            );
          },

          tabBarLabel: "", // 글자 숨기기
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "",
          headerRight: () => <Button title="Info" color="#fff" />,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "",
          headerRight: () => <Button title="Info" color="#fff" />,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const PlantStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="PlantInfoScreen">
      <Stack.Screen
        name="PlantInfoScreen"
        component={PlantInfoScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DataScreen"
        component={DataScreen}
        options={{
          title: "",
          headerRight: () => <Button title="Info" color="#fff" />,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddPlant"
        component={AddPlantScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const AddStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="AddScreen">
      <Stack.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
          title: "",
          headerRight: () => <Button title="Info" color="#fff" />,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="AddSuccess"
        component={AddSuccess}
        options={{
          title: "",
          headerRight: () => <Button title="Info" color="#fff" />,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "comfortaa-regular": require("./assets/fonts/Comfortaa-Regular.ttf"),
        "comfortaa-bold": require("./assets/fonts/Comfortaa-Bold.ttf"),
        "comfortaa-medium": require("./assets/fonts/Comfortaa-Medium.ttf"),
        "comfortaa-light": require("./assets/fonts/Comfortaa-Light.ttf"),
      });

      setFontsLoaded(true);
    }
    // 권한 요청
    const registerForPushNotifications = async () => {
      // 권한 확인
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;

      // 권한이 허용되지 않은 경우
      if (existingStatus !== "granted") {
        // 권한 요청
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }

      // 권한이 거부된 경우
      if (finalStatus !== "granted") {
        return;
      }

      // Expo 푸시 알림 토큰 가져오기
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token); // 푸시 알림 토큰 출력
      Notifications.addListener(handleNotification);
    };

    registerForPushNotifications();

    loadFonts(); // 초기 렌더링 시 한 번만 호출
  }, []); // 빈 의존성 배열로 설정하여 한 번만 실행되도록 함

  if (!fontsLoaded) {
    // 폰트가 로드되지 않았을 때 로딩 화면 또는 다른 대체 처리를 할 수 있습니다.
    console.log("Loader is working");
    return <Loader />; // 로딩 중일 때 Loader 컴포넌트를 반환
  }
  // 알림을 처리하는 핸들러 함수
  const handleNotification = (notification) => {
    console.log("Received notification:", notification);
    // 알림을 처리하는 로직을 추가할 수 있습니다.
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={HomeStackScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Add"
            component={AddStackScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Plant"
            component={PlantStackScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        {/* <Stack.Screen name="Main" component={HomeStackScreen} /> */}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 1,
    resizeMode: "contain",
  },
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: "row",
  },
  btn: {
    margin: 16,
    padding: 8,
    backgroundColor: "rgba(45, 63, 34, 0.7)",
    borderRadius: 4,
  },
  btnText: {
    fontSize: 24,
    color: "white",
    fontWeight: "400",
  },
  circle: {
    marginTop: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  activeCircle: {
    backgroundColor: "rgba(45, 87, 76, 0.3)",
  },
});
