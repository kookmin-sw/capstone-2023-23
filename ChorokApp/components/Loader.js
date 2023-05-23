import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Image,
  Text,
} from "react-native";

const Loader = (props) => {
  const { loading, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={loading}
      onRequestClose={() => {
        console.log("close modal");
      }}
    >
      <View style={styles.modalBackground}>
        {/* <Image
          source={require("../img/logo.png")}
          style={{
            resizeMode: "contain",
            flex: 0.2,
          }}
        /> */}
        <Text
          style={{
            fontSize: 32,
            fontWeight: "500",
            fontFamily: "comfortaa-bold",
            marginBottom: 30,
          }}
        >
          Loading . . .{" "}
        </Text>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={true}
            color="#000000"
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "rgb(231,241,239)",
  },
  activityIndicatorWrapper: {
    backgroundColor: "rgb(231,241,239)",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
