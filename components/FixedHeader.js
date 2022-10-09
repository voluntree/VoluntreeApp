import { Header, Icon } from "react-native-elements";
import { TouchableOpacity, View } from "react-native";
import {theme} from "../tailwind.config"

const FixedHeader = () => {
  return (
    <View>
      <Header
        backgroundColor = {theme.colors.bottomTabs}
        barStyle="light-content"
        centerComponent={{
          text: "Voluntree",
          style: { color: "#333" },
        }
        }
        containerStyle={
          {justifyContent: "space-between"}
        }
        leftComponent={
          <View>
            <TouchableOpacity>
              <Icon name="menu" color="black" />
            </TouchableOpacity>
          </View>
        }
        placement="center"
        rightComponent={<View>
          <TouchableOpacity>
            <Icon name="settings" color="black" />
          </TouchableOpacity>
        </View>}
      ></Header>
    </View>
  );
};
export default FixedHeader;
