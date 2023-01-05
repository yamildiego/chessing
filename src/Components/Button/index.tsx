import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { primaryColor } from "../../Constants/MyColors";

interface ButtonProps {
  disabled?: boolean;
  bgColor?: string;
  width?: number;
  children?: React.ReactNode;
  title?: React.ReactNode;
  onPress?: () => void;
}

const Button = (props: ButtonProps) => {
  const { disabled, bgColor, width, children, title } = props;
  return (
    <TouchableOpacity
      disabled={disabled !== undefined ? disabled : false}
      onPress={props.onPress}
      style={{
        ...styles.button,
        backgroundColor: bgColor != undefined ? bgColor : primaryColor,
        width: width != undefined ? width : "100%",
      }}
    >
      <Text style={styles.buttonText}>{title !== undefined ? title : children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    borderRadius: 4,
    textAlign: "center",
    alignItems: "center",
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
