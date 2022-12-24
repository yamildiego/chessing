import { StyleSheet, View, Modal } from "react-native";

const MyModal = (props) => {
  return (
    <Modal transparent={true} animationType="none" {...props}>
      <View style={styles.container}>{props.children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default MyModal;
