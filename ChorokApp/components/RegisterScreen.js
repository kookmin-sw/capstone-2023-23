import React, { createRef, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import KeyboardAvoidingViewCompat from "react-native-keyboard-aware-scroll-view";
import Loader from "./Loader";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwchk, setPwchk] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [errortext2, setErrortext2] = useState("");

  const emailInputRef = createRef();
  const pwInputRef = createRef();
  const pwchkInputRef = createRef();
  const firstInputRef = createRef();
  const lastInputRef = createRef();
  const route = useRoute();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://3.38.62.245:8080/register/user",
        {
          email: email,
          pw: password,
          firstname: firstName,
          lastname: lastName,
        }
      );
      console.log(response.data);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      // 회원가입 실패시 처리 로직
    }
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -hp(7)}
    >
      <Back />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* <Loader loading={loading} style={{ flex: 1 }} /> */}
        <View style={styles.topArea}>
          <View style={styles.titleArea}>
            <Text style={styles.headerText}>Sign up</Text>
          </View>
          <View style={styles.TextArea}>
            <Text style={styles.Text}>회원가입하여 나만의 작은 화분</Text>
            <Text style={styles.Text}>초록이를 사용해보세요 🪴</Text>
          </View>
        </View>

        <View style={styles.formArea}>
          <TextInput
            style={styles.textFormTop}
            placeholder={"아이디(5자 이상, 영문, 숫자)"}
            onChangeText={(email) => setEmail(email)}
            value={email}
            ref={emailInputRef}
            onSubmitEditing={() =>
              pwInputRef.current & pwInputRef.current.focus()
            }
            returnKeyType="next"
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.textFormMiddle}
            secureTextEntry={true}
            placeholder={"비밀번호"}
            onChangeText={(password) => setPassword(password)}
            value={password}
            ref={pwInputRef}
            onSubmitEditing={() =>
              pwchkInputRef.current & pwchkInputRef.current.focus()
            }
            returnKeyType="next"
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.textFormBottom}
            secureTextEntry={true}
            placeholder={"비밀번호 확인"}
            onChangeText={(pwchk) => setPwchk(pwchk)}
            value={pwchk}
            ref={pwchkInputRef}
            onSubmitEditing={() =>
              firstInputRef.current & firstInputRef.current.focus()
            }
            returnKeyType="next"
            blurOnSubmit={false}
          />
        </View>

        <View style={{ flex: 0.5, justifyContent: "center" }}>
          {password !== pwchk ? (
            <Text style={styles.TextValidation}>
              비밀번호가 일치하지 않습니다.
            </Text>
          ) : null}
        </View>

        <View style={styles.formArea2}>
          <TextInput
            style={styles.textFormTop}
            placeholder={"성"}
            onChangeText={(firstName) => setFirstName(firstName)}
            value={firstName}
            ref={firstInputRef}
            onSubmitEditing={() =>
              lastInputRef.current & lastInputRef.current.focus()
            }
            returnKeyType="next"
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.textFormBottom}
            placeholder={"이름"}
            onChangeText={(lastName) => setLastName(lastName)}
            value={lastName}
            ref={lastInputRef}
            returnKeyType="next"
            blurOnSubmit={false}
          />
        </View>

        <View style={{ flex: 0.7, justifyContent: "center" }}>
          {errortext2 !== "" ? (
            <Text style={styles.TextValidation}>{errortext2}</Text>
          ) : null}
        </View>

        <View style={{ flex: 0.75 }}>
          <View style={styles.btnArea}>
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text
                style={{
                  color: "white",
                  fontSize: wp("5%"),
                  fontFamily: "comfortaa-medium",
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 2 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: "column",
    backgroundColor: "white",
    paddingLeft: wp(7),
    paddingRight: wp(7),
    paddingTop: hp(9),
  },
  topArea: {
    flex: 1,
    paddingTop: wp(2),
    paddingLeft: 10,
  },
  titleArea: {
    justifyContent: "center",
    paddingTop: wp(3),
  },
  TextArea: {
    justifyContent: "center",
    paddingTop: hp(3),
  },
  alertArea: {
    height: wp(150),
  },
  Text: {
    fontSize: wp(4),
    fontFamily: "comfortaa-medium",
  },
  TextValidation: {
    fontSize: wp("4%"),
    color: "red",
    fontFamily: "comfortaa-medium",
    // paddingTop: wp(5),
  },

  formArea: {
    flex: 1,
    justifyContent: "center",
    marginBottom: hp(-3),
  },

  formArea2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(-2),
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
  textFormMiddle: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black",
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
    // backgroundColor: 'orange',
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
    backgroundColor: "rgb(50,110,97)",
  },
  inputIOS: {
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
  headerText: {
    fontSize: hp("4.5%"),
    fontWeight: "500",
    fontFamily: "comfortaa-bold",
  },
});
