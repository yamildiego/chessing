import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { primaryColor } from "../../Constants/MyColors";

const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        ...styles.button,
        backgroundColor: props.bgColor != undefined ? props.bgColor : primaryColor,
        width: props.width != undefined ? props.width : "100%",
      }}
    >
      <Text style={styles.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 45,
    color: "white",
    fontFamily: "Ubuntu",
  },
});

export default Button;
