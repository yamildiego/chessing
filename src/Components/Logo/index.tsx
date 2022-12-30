import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Avatar } from "react-native-paper";

import { logoColor } from "../../Constants/MyColors";
import logo from "../../../assets/icon.png";

const Logo = () => {
  const size = Math.round(Dimensions.get("window").width * 0.06);

  return (
    <View style={styles.logo}>
      <Avatar.Image style={{ backgroundColor: "transparent" }} size={size * 5} source={logo} />
      <Text style={{ ...styles.title, color: logoColor, fontSize: size, lineHeight: size * 2 }}>Chessing</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 38,
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "CCKillJoy",
  },
});

export default Logo;
