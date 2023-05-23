import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AddSuccess() {
  const navigation = useNavigation();
  const onPressEvent = () => {
    navigation.navigate("Home");
  };
  return (
    <View>
      <Text>AddSuccess</Text>
      <TouchableOpacity onPress={onPressEvent}>
        <Text>Text</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
