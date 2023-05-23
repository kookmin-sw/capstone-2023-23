import React, { createRef, useState } from "react";
import Back from "./Back";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  const passwordInputRef = createRef();

  const handleSubmit = async () => {
    console.log(userEmail, userPassword);
    setErrortext("");
    if (!userEmail) {
      alert("아이디를 입력해주세요");
      return;
    }
    if (!userPassword) {
      alert("비밀번호를 입력해주세요");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://3.38.62.245:8080/login/general",
        {
          email: userEmail,
          pw: userPassword,
        }
      );
      console.log(response.data);
      // store token in async storage
      await AsyncStorage.multiSet([
        ["user_email", response.data.email],
        ["user_id", JSON.stringify(response.data.id)],
        ["user_firstname", response.data.firstname],
        ["user_lastname", response.data.lastname],
      ]);
      navigation.navigate("Main");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.titleArea}>
          <Text style={styles.headerText}>Log In</Text>
        </View>
        <View style={styles.TextArea}>
          <Text style={styles.Text}>Welcome to our service!</Text>
          <Text style={styles.Text}>Please Log In</Text>
        </View>
      </View>

      <View style={styles.formArea}>
        <TextInput
          style={styles.textFormTop}
          placeholder={"아이디"}
          onChangeText={(userEmail) => setUserEmail(userEmail)}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.textFormBottom}
          onChangeText={(userPassword) => setUserPassword(userPassword)}
          secureTextEntry={true}
          placeholder={"비밀번호"}
          returnKeyType="next"
          keyboardType="default"
          ref={passwordInputRef}
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
        />
        {errortext != "" ? (
          <Text style={styles.TextValidation}> {errortext}</Text>
        ) : null}
      </View>

      <View style={{ flex: 0.75 }}>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text
              style={{
                color: "white",
                fontSize: wp("4.5%"),
                fontFamily: "comfortaa-medium",
              }}
            >
              Log in
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={styles.TextRegister}
          onPress={() => navigation.navigate("Register")}
        >
          초록이가 처음이시라면, 회원가입이 필요해요.
        </Text>
      </View>
      <View style={{ flex: 3 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  topArea: {
    flex: 1,
    paddingTop: wp(2),
    paddingLeft: wp(2),
  },
  titleArea: {
    flex: 0.7,
    justifyContent: "center",
    paddingTop: wp(3),
  },
  headerText: {
    fontSize: hp("4.5%"),
    fontWeight: "500",
    fontFamily: "comfortaa-bold",
  },
  TextArea: {
    flex: 0.3,
    justifyContent: "center",
    backgroundColor: "white",
  },
  Text: {
    fontSize: wp("4%"),
    fontFamily: "comfortaa-medium",
  },
  TextValidation: {
    fontSize: wp("4%"),
    color: "red",
    paddingTop: wp(2),
  },
  TextRegister: {
    fontSize: wp("4%"),
    color: "grey",
    fontFamily: "comfortaa-regular",
    textDecorationLine: "underline",
    paddingTop: wp(2),
  },
  formArea: {
    justifyContent: "center",
    flex: 1.5,
  },
  textFormTop: {
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: "black",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: "100%",
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  textFormBottom: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: "black",
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: "100%",
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnArea: {
    height: hp(8),
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: hp(1.5),
  },
  btn: {
    flex: 1,
    width: "100%",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(129,184,168)",
  },
});
