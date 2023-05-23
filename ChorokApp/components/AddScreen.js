import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Loader from "./Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function AddScreen() {
  const navigation = useNavigation();
  const [boothName, setBoothName] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태를 저장하는 상태 변수

  const handleSubmit = async () => {
    const userId = await AsyncStorage.getItem("user_id");
    try {
      setLoading(true); // 로딩 상태를 true로 설정

      const response = await axios.post(
        "http://3.38.62.245:8080/device/register/newdevice",
        {
          userId: userId,
          deviceId: deviceId,
          deviceName: boothName,
        }
      );

      setLoading(false); // 로딩 상태를 false로 설정
      navigation.navigate("AddSuccess");
    } catch (error) {
      setLoading(false); // 로딩 상태를 false로 설정
      console.error(error);
    }
  };

  if (loading) {
    return <Loader />; // 로딩 중일 때 Loader 컴포넌트를 반환
  }

  return (
    <View>
      <Text>Add my booth</Text>
      <Text>Booth의 이름과 번호를 정해주세요!</Text>

      <TextInput
        placeholder="Booth Name"
        value={boothName}
        onChangeText={(text) => setBoothName(text)}
      />

      <TextInput
        placeholder="Booth Serial Number"
        value={deviceId}
        onChangeText={(text) => setDeviceId(text)}
      />
      <Button onPress={handleSubmit} title="Add" />
    </View>
  );
}
