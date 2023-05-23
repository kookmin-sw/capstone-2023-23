import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Back() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <Image source={require("../img/back.png")} style={styles.backIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: hp(6.5),
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
