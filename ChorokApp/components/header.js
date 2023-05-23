import { StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerBox}>
        <Text style={styles.bigFont}>죽지마 초록아</Text>
        {/* <Text style={styles.smallFont}>
          Full Time Managed Plant Care Service
        </Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "rgb(89, 100, 51)",
    borderBottomEndRadius: 45,
    borderBottomStartRadius: 45,
  },
  headerBox: {
    justifyContent: "flex-start",
  },
  bigFont: {
    fontSize: hp("5%"),
    color: "#2d3f22",
    color: "black",
    color: "rgb(254,249,223)",
    fontWeight: "700",
    fontWeight: "600",
    margin: hp("4%"),
    marginBottom: hp("2%"),
  },
  smallFont: {
    fontSize: hp("2%"),
    color: "rgb(182,186,146)",
    fontWeight: "400",
    marginLeft: hp("4%"),
  },
});

export default Header;
