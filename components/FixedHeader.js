import { Header, Icon } from "react-native-elements";
import { TouchableOpacity, View } from "react-native";

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
        containerStyle={{ width: 360 }}
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
