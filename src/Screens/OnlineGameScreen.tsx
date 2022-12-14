import React from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { StyleSheet, View, ImageBackground } from "react-native";
// import { StyleSheet, View, ImageBackground, Alert, BackHandler } from "react-native";

import Chessboard from "../Components/Chessboard";
import PlayersInfo from "../Components/PlayersInfo";
import ModalWins from "../Components/ModalWins";
// import ModalPromotePawn from "../Components/ModalPromotePawn";
// import Options from "../Components/Options";

import * as match from "../Actions/match";
import * as online from "../Actions/online";

import background from "../Assets/background.jpg";
import { Chess, Color } from "yd-chess-lib";

interface OnlineGameScreenProps {
  offer_a_draw: boolean;
  ask_for_resign: boolean;
  is_playing: Color;
  code: string | null;
  on_progress: boolean;
  square_selected: PieceType | null;
  status: { players: Array<PlayerType>; history: string; last_movement: string | null };
  setOfferADraw: (value: boolean) => void;
  setAskForResign: (value: boolean) => void;
  setDataFinished: (value: { status: string | null; winner: string | null; modal_visible: boolean }) => void;
  updateStatus: (code: string) => void;
  navigation: any;
}

class OnlineGameScreen extends React.Component<OnlineGameScreenProps> {
  private interval: ReturnType<typeof setInterval>;

  constructor(props: OnlineGameScreenProps) {
    super(props);
    this.interval = setInterval(this.updateStatus, 500);
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    let historyGlobal = Chess.getInstance().getHistory();
    let history = this.props.status.history;
    if (historyGlobal.length == 0 && history !== null)
      JSON.parse(history).forEach((movement: string) => Chess.getInstance().move(movement));

    //   BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonClick);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    //   BackHandler.removeEventListener("hardwareBackPress", this.handleBackButtonClick);
  }

  updateStatus = () => {
    if (this.props.code !== null && this.props.on_progress == false && this.props.square_selected == null)
      this.props.updateStatus(this.props.code);
  };

  // handleBackButtonClick() {
  //   if (this.props.navigation.isFocused()) {
  //     Alert.alert("Quit Game", "Are you sure?", [
  //       {
  //         text: "OK",
  //         onPress: () => {
  //           this.props.setOfferADraw(false);
  //           this.props.setDataFinished({
  //             status: "Resign",
  //             winner: this.props.is_playing == Color.WHITE ? Color.BLACK : Color.WHITE,
  //             modal_visible: true,
  //           });
  //         },
  //       },
  //       { text: "Cancel", onPress: () => {} },
  //     ]);
  //     return true;
  //   }
  // }

  // setDraw = () => {
  //   this.props.setOfferADraw(false);
  //   this.props.setDataFinished({ status: "Agreement", winner: "none", modal_visible: true });
  // };

  // showAlertOfferADraw = () => {
  //   Alert.alert(`Player offer you a draw`, "", [
  //     { text: "Yes", onPress: this.setDraw },
  //     { text: "No", onPress: () => this.props.setOfferADraw(false), style: "cancel" },
  //   ]);
  // };

  // showAlertAskForResign = () => {
  //   Alert.alert("Resign Game", "Are you sure?", [
  //     {
  //       text: "OK",
  //       onPress: () => {
  //         this.props.setOfferADraw(false);
  //         this.props.setAskForResign(false);
  //         this.props.setDataFinished({
  //           status: "Resign",
  //           winner: this.props.is_playing == Color.WHITE ? Color.BLACK : Color.WHITE,
  //           modal_visible: true,
  //         });
  //       },
  //     },
  //     {
  //       text: "Cancel",
  //       onPress: () => this.props.setAskForResign(false),
  //     },
  //   ]);
  // };

  render() {
    // const { is_playing } = this.props;

    return (
      <ImageBackground source={background} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.container}>
          <ModalWins navigation={this.props.navigation} />
          {/* <ModalPromotePawn /> */}
          {/* {this.props.offer_a_draw ? this.showAlertOfferADraw() : ""} */}
          {/* {this.props.ask_for_resign ? this.showAlertAskForResign() : ""} */}
          <View style={{ flex: 2 }}></View>
          <Chessboard />
          <PlayersInfo playerMain={true} />
          <View style={{ flex: 2 }}></View>
          {/* <Options playerMain={true} color={is_playing} /> */}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

function mapStateToProps(state: StateType) {
  return {
    flip: state.config.flip,
    offer_a_draw: state.match.offer_a_draw,
    ask_for_resign: state.match.ask_for_resign,
    is_playing: state.match.is_playing,
    square_selected: state.match.square_selected,
    winner: state.match.data_finished.winner,
    code: state.online.code,
    on_progress: state.online.on_progress,
    status: state.online.status,
  };
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  setOfferADraw: match.setOfferADraw,
  setAskForResign: match.setAskForResign,
  setDataFinished: match.setDataFinished,
  updateStatus: online.updateStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(OnlineGameScreen);
