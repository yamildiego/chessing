import React from "react";
import { connect } from "react-redux";
import { StyleSheet, ImageBackground, Alert, BackHandler } from "react-native";

import Board from "../Components/Board";
import PlayersInfo from "../Components/PlayersInfo";
import ModalWins from "../Components/ModalWins";
import ModalPromotePawn from "../Components/ModalPromotePawn";
import Options from "../Components/Options";

import * as match from "../Actions/match";

import background from "../Assets/background.jpg";
import { Color } from "yd-chess-lib";

class LocalGameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButtonClick);
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
    return (
      <ImageBackground source={background} resizeMode="cover" style={styles.backgroundImage}>
        <ModalWins navigation={this.props.navigation} />
        <ModalPromotePawn />
        {this.props.offer_a_draw ? this.showAlertOfferADraw() : ""}
        {this.props.ask_for_resign ? this.showAlertAskForResign() : ""}
        <Options playerMain={false} color={Color.BLACK} />
        <PlayersInfo playerMain={false} />
        <Board />
        <PlayersInfo playerMain={true} />
        <Options playerMain={true} color={Color.WHITE} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

function mapStateToProps(state, props) {
  return {
    offer_a_draw: state.match.offer_a_draw,
    ask_for_resign: state.match.ask_for_resign,
    is_playing: state.match.is_playing,
    winner: state.match.winner,
  };
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setOfferADraw: match.setOfferADraw,
  setAskForResign: match.setAskForResign,
  setDataFinished: match.setDataFinished,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalGameScreen);
