import { Dimensions } from "react-native";

const window_width = Dimensions.get("window").width;
const size_screen = Math.round(window_width * 0.94);

const initialState = {
  window_width,
  size_screen,
  margin_screen: (window_width - size_screen) / 2,
  size_square: Math.round(window_width * 0.1175),
};

export default function visual(state = initialState, action: { type: string; value: any }) {
  switch (action.type) {
    default:
      return state;
  }
}
