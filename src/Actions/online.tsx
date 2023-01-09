import axios from "axios";
import { Dispatch } from "redux";
import * as match from "./match";
import * as TYPES from "../Reducers/types";
import * as Device from "expo-device";
import { Color } from "yd-chess-lib";

export const inizialize = () => ({ type: TYPES.INITIALIZE_GAME_ONLINE });

export const setIsLoading = (value: boolean) => ({ type: TYPES.SET_IS_LOADING, value });

export const setCode = (value: string | null) => ({ type: TYPES.SET_CODE_ONLINE, value });

export const setStatus = (value: StatusType) => ({ type: TYPES.SET_STATUS, value });

export const setOnProgress = (value: boolean) => ({ type: TYPES.SET_ON_PROGRESS, value });

export const setMainPlayerColor = (value: string) => ({ type: TYPES.SET_MAIN_PLAYER_COLOR, value });

export const setPieceMovedOnline = (value: { from: string; to: string } | null) => ({ type: TYPES.SET_PIECE_MOVED_ONLINE, value });

export const createGame = () => {
  return (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));
    let baseUrl = "http://192.168.1.114:3000";
    axios
      .post(`${baseUrl}/games/create`, {}, { timeout: 2000 })
      .then((response) => {
        dispatch(setCode(response.data.data.code));
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setCode(null));
        dispatch(setIsLoading(false));
      });
  };
};

export const joinGame = (code: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));
    let device_id = `${Device.manufacturer} | ${Device.deviceName}`;
    let baseUrl = "http://192.168.1.114:3000";
    axios
      .put(`${baseUrl}/games/join/${code}`, { device_id }, { timeout: 2000 })
      .then((response) => {
        if (response.data.status == "OK") {
          let mainPlayer = response.data.data.players.filter((x) => x.device_id == device_id)[0];
          dispatch(setCode(code));
          dispatch(setStatus(response.data.data));
          dispatch(setMainPlayerColor(mainPlayer.color));
        } else {
          console.log("joinGame paso un error pusheable");
        }
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setIsLoading(false));
      });
  };
};

export const updateStatus = (code: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setOnProgress(true));
    let device_id = `${Device.manufacturer} | ${Device.deviceName}`;
    let baseUrl = "http://192.168.1.114:3000";
    axios
      .post(`${baseUrl}/games/updateStatus`, { code, device_id }, { timeout: 2000 })
      .then((response) => {
        if (response.data.status == "OK") {
          if (response.data.data.movements == null) {
            dispatch(match.setPlayer(Color.WHITE));
          } else {
            let len = JSON.parse(response.data.data.movements).length;
            if (len % 2 == 0) dispatch(match.setPlayer(Color.WHITE));
            else dispatch(match.setPlayer(Color.BLACK));
          }

          if (response.data.data.last_movement !== null) {
            let posLastMovement = response.data.data.last_movement.split("x");
            dispatch(setPieceMovedOnline({ from: posLastMovement[0], to: posLastMovement[1] }));
          }

          dispatch(setStatus(response.data.data));
        } else {
          console.log("updateStatus paso un error pusheable");
        }
        dispatch(setOnProgress(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setOnProgress(false));
      });
  };
};

export const addMovement = (code: string, p_movement, callback) => {
  return (dispatch: Dispatch) => {
    let baseUrl = "http://192.168.1.114:3000";
    axios
      .put(`${baseUrl}/games/addMovement/${code}`, { movement: p_movement }, { timeout: 2000 })
      .then((response) => {
        if (response.data.status == "OK") {
          // dispatch(setStatus(response.data.data));
          callback();
        } else {
          console.log("addMovement paso un error pusheable");
        }
        dispatch(setOnProgress(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setOnProgress(false));
      });
  };
};
