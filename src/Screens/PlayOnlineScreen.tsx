import { StyleSheet, View } from "react-native";
import { connect, MapDispatchToProps } from "react-redux";

import * as match from "../Actions/match";

import Logo from "../Components/Logo";
import Button from "../Components/Button";

interface PlayOnlineScreenProps {
  navigation: any;
}

const PlayOnlineScreen = (props: PlayOnlineScreenProps) => {
  const joinGame = () => props.navigation.navigate("ConfigOnlineScreen");

  const createGame = () => props.navigation.navigate("ConfigOnlineScreen");

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.subContainer}>
        <View style={styles.buttons}>
          <Button onPress={joinGame}>Join game</Button>
          <Button onPress={createGame}>Create game</Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  subContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-between",
  },
});

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  initializedBoard: match.initializedBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayOnlineScreen);
