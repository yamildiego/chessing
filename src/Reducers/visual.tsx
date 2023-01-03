import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const sizeScreen = Math.round(windowWidth * 0.94);

const initialState = {
  windowWidth,
  sizeScreen,
  marginScreen: (windowWidth - sizeScreen) / 2,
  sizeSquare: Math.round(windowWidth * 0.1175),
};

export default function visual(state = initialState, action: { type: string; value: any }) {
  switch (action.type) {
    default:
      return state;
  }
}
