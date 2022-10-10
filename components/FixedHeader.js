import { Header, Icon } from "react-native-elements";
import { TouchableOpacity, View } from "react-native";
import {theme} from "../tailwind.config"

const FixedHeader = () => {
  return (
    <View>
      <Header
        backgroundColor={theme.colors.bottomTabs}
        barStyle="light-content"
        centerComponent={{
          text: "Voluntree",
          style: { color: "#333", fontWeight: "bold", fontSize: 20 },
        }}
        containerStyle={{ justifyContent: "space-between" }}
        leftComponent={
          <View>
            <TouchableOpacity className="pt-2">
              <Icon name="menu" color="black" />
            </TouchableOpacity>
          </View>
        }
        placement="center"
        rightComponent={
          <View>
            <TouchableOpacity className="pt-2">
              <Icon name="settings" color="black" />
            </TouchableOpacity>
          </View>
        }
      ></Header>
    </View>
  );
};
export default FixedHeader;
