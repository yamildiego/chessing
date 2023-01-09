import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator, TextInput, BackHandler, Alert } from "react-native";
import { connect, MapDispatchToProps } from "react-redux";

import Button from "../Components/Button";
import Logo from "../Components/Logo";

import * as match from "../Actions/match";
import * as online from "../Actions/online";

interface JoinOnlineScreenProps {
  code: string;
  players: Array<PlayerType>;
  on_progress: boolean;
  joinGame: (code: string) => void;
  updateStatus: (code: string) => void;
  initializedBoard: () => void;
  inizialize: () => void;
  navigation: any;
}

class JoinOnlineScreen extends Component<JoinOnlineScreenProps> {
  state = { code: "YAMIL" };
  private interval: ReturnType<typeof setInterval>;

  constructor(props: JoinOnlineScreenProps) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.interval = setInterval(this.updateStatus, 4000);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonClick);
    if (this.props.code !== null) this.props.joinGame(this.props.code);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButtonClick);
  }

  updateStatus = () => {
    if (this.props.code !== null && this.props.on_progress == false) this.props.updateStatus(this.props.code);
  };

  handleBackButtonClick() {
    if (this.props.navigation.isFocused()) {
      if (this.props.code !== null) {
        Alert.alert("Quit Game", "Are you sure?", [
          {
            text: "OK",
            onPress: () => {
              clearInterval(this.interval);
              this.props.initializedBoard();
              this.props.inizialize();
              this.props.navigation.navigate("PlayOnlineScreen");
            },
          },
          { text: "Cancel", onPress: () => {} },
        ]);
      } else {
        clearInterval(this.interval);
        this.props.navigation.goBack();
      }
    }
    return true;
  }

  componentDidUpdate = (oldProps: JoinOnlineScreenProps) => {
    if (oldProps.players.length !== this.props.players.length && this.props.players.length == 2) {
      clearInterval(this.interval);
      this.props.navigation.navigate("OnlineGameScreen");
    }
  };

  joinGame = () => {
    if (this.state.code !== null) this.props.joinGame(this.state.code);
  };

  render() {
    const { code } = this.props;
    return (
      <View style={styles.container}>
        <Logo />
        {code !== null && (
          <View>
            <Text style={styles.codeText}>{`Game code: ${code}`}</Text>
            <Text style={styles.waitingText}>Waiting for opponent</Text>
          </View>
        )}

        {code == null && (
          <View style={{ alignItems: "center" }}>
            <TextInput
              value={this.state.code}
              onChange={(event) => this.setState({ code: event.nativeEvent.text })}
              autoCapitalize={"characters"}
              style={{ fontSize: 20, textAlign: "center" }}
              autoFocus={true}
              placeholder="Enter game code"
            />
          </View>
        )}

        <View style={styles.subContainer}>
          <View style={styles.buttons}>
            {code == null && <Button onPress={this.joinGame}>Join game</Button>}
            {code !== null && <Button title={<ActivityIndicator color={"#fff"} />}></Button>}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  subContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  codeText: {
    textAlign: "center",
    fontSize: 20,
    color: "#222",
  },
  waitingText: {
    textAlign: "center",
    fontSize: 20,
    color: "#222",
    marginTop: 20,
  },
  buttons: {
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-between",
  },
});

const mapStateToProps = (state: StateType) => ({
  code: state.online.code,
  players: state.online.status.players,
  on_progress: state.online.on_progress,
});

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  initializedBoard: match.initializedBoard,
  inizialize: online.inizialize,
  joinGame: online.joinGame,
  updateStatus: online.updateStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinOnlineScreen);
