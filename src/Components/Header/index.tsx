import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";

import { primaryColor, secondaryColor, textColor } from "../../Constants/MyColors";
import logo from "../../../assets/adaptive-icon.png";

class Header extends Component {
  state = { user: null };
  render() {
    const { user } = this.state;
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AppBar
          style={{ paddingTop: 35, flex: 1, backgroundColor: "white", width: "100%" }}
          centerTitle={true}
          title={() => <Text style={{ color: textColor, fontFamily: "CCKillJoy", fontSize: 20, lineHeight: 50 }}>Chessing</Text>}
          leading={() => <Avatar.Image style={{ backgroundColor: "transparent" }} size={50} source={logo} />}
          trailing={(props) => ""}
        />
      </View>
    );
  }
}

export default Header;
