import { StyleSheet, View, Modal } from "react-native";

interface MyModalProps {
  visible: boolean;
  children: React.ReactNode;
  onRequestClose: () => void;
}

const MyModal = (props: MyModalProps) => {
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
