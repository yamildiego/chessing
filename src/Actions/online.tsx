import axios from "axios";
import { Dispatch } from "redux";
import * as TYPES from "../Reducers/types";
import * as Device from "expo-device";

export const inizialize = () => ({ type: TYPES.INITIALIZE_GAME_ONLINE });

export const setIsLoading = (value: boolean) => ({ type: TYPES.SET_IS_LOADING, value });

export const setCode = (value: string | null) => ({ type: TYPES.SET_CODE_ONLINE, value });

export const setStatus = (value: StatusType) => ({ type: TYPES.SET_STATUS, value });

export const createGame = () => {
  return (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));
    let baseUrl = "http://192.168.1.114:3000";
    axios
      .post(`${baseUrl}/games/create`)
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
      .put(`${baseUrl}/games/join/${code}`, { device_id })
      .then((response) => {
        console.log(response.data);
        if (response.data.status == "OK") {
          dispatch(setCode(code));
          dispatch(setStatus(response.data.data));
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
    let device_id = `${Device.manufacturer} | ${Device.deviceName}`;
    let baseUrl = "http://192.168.1.114:3000";
    axios
      .post(`${baseUrl}/games/updateStatus`, { code, device_id })
      .then((response) => {
        console.log(response.data);
        if (response.data.status == "OK") {
          dispatch(setStatus(response.data.data));
        } else {
          console.log("updateStatus paso un error pusheable");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
