import { Header } from "react-native-elements";
import { View } from "react-native";

const FixedHeader = () => {
  return (
    <View>
      <Header
        backgroundColor="#FFFBFE"
        barStyle="light-content"
        centerComponent={{
          text: "Voluntree",
          style: { color: "#333" },
        }}
        containerStyle={{ width: 350 }}
        leftComponent={{ icon: "menu", color: "#333" }}
        placement="center"
        rightComponent={{ icon: "settings", color: "#333" }}
      ></Header>
    </View>
  );
};
export default FixedHeader;
