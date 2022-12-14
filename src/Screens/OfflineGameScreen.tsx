import React from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { StyleSheet, View, ImageBackground, Alert, BackHandler } from "react-native";

import Chessboard from "../Components/Chessboard";
import PlayersInfo from "../Components/PlayersInfo";
import ModalWins from "../Components/ModalWins";
import ModalPromotePawn from "../Components/ModalPromotePawn";
import Options from "../Components/Options";

import * as match from "../Actions/match";

import background from "../Assets/background.jpg";
import { Color } from "yd-chess-lib";

interface OfflineGameScreenProps {
  flip: string;
  offer_a_draw: boolean;
  ask_for_resign: boolean;
  is_playing: Color;
  setOfferADraw: (value: boolean) => void;
  setAskForResign: (value: boolean) => void;
  setDataFinished: (value: { status: string | null; winner: string | null; modal_visible: boolean }) => void;
  navigation: any;
}

class OfflineGameScreen extends React.Component<OfflineGameScreenProps> {
  constructor(props: OfflineGameScreenProps) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButtonClick);
  }

  componentDidUpdate(prevProps: OfflineGameScreenProps) {
    if (prevProps.offer_a_draw != this.props.offer_a_draw && this.props.offer_a_draw) this.showAlertOfferADraw();
    if (prevProps.offer_a_draw != this.props.ask_for_resign && this.props.ask_for_resign) this.showAlertAskForResign();
  }

  handleBackButtonClick() {
    if (this.props.navigation.isFocused()) {
      Alert.alert("Quit Game", "Are you sure?", [
        {
          text: "OK",
          onPress: () => {
            this.props.setOfferADraw(false);
            this.props.setDataFinished({
              status: "Resign",
              winner: this.props.is_playing == Color.WHITE ? Color.BLACK : Color.WHITE,
              modal_visible: true,
            });
          },
        },
        { text: "Cancel", onPress: () => {} },
      ]);
      return true;
    }
  }

  setDraw = () => {
    this.props.setOfferADraw(false);
    this.props.setDataFinished({ status: "Agreement", winner: "none", modal_visible: true });
  };

  showAlertOfferADraw = () => {
    Alert.alert(`Player offer you a draw`, "", [
      { text: "Yes", onPress: this.setDraw },
      { text: "No", onPress: () => this.props.setOfferADraw(false), style: "cancel" },
    ]);
  };

  showAlertAskForResign = () => {
    Alert.alert("Resign Game", "Are you sure?", [
      {
        text: "OK",
        onPress: () => {
          this.props.setOfferADraw(false);
          this.props.setAskForResign(false);
          this.props.setDataFinished({
            status: "Resign",
            winner: this.props.is_playing == Color.WHITE ? Color.BLACK : Color.WHITE,
            modal_visible: true,
          });
        },
      },
      {
        text: "Cancel",
        onPress: () => this.props.setAskForResign(false),
      },
    ]);
  };

  render() {
    const { flip, is_playing } = this.props;

    return (
      <ImageBackground source={background} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.container}>
          <ModalWins navigation={this.props.navigation} />
          <ModalPromotePawn />
          {flip == "pieces" && (
            <>
              <Options playerMain={false} color={Color.BLACK} />
              <PlayersInfo playerMain={false} />
            </>
          )}
          {flip !== "pieces" && <View style={{ flex: 2 }}></View>}
          <Chessboard />
          <PlayersInfo playerMain={true} />
          <Options playerMain={true} color={flip == "pieces" ? Color.WHITE : is_playing} />
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
    winner: state.match.data_finished.winner,
  };
}

const mapDispatchToProps: MapDispatchToProps<any, StateType> = {
  setOfferADraw: match.setOfferADraw,
  setAskForResign: match.setAskForResign,
  setDataFinished: match.setDataFinished,
};

export default connect(mapStateToProps, mapDispatchToProps)(OfflineGameScreen);
