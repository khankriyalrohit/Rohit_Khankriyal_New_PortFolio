import axios from "axios";
import {
  HERO_REQUEST,
  HERO_SUCCESS,
  HERO_FAIL,
  HERO_UPDATE_REQUEST,
  HERO_UPDATE_SUCCESS,
  HERO_UPDATE_FAIL,
  HERO_API,
} from "../constants/portfolioconstants";
import axiosInstance from "../utils/axiosInstance";

// Fetch hero section
export const fetchHero = () => async (dispatch) => {
  try {
    dispatch({ type: HERO_REQUEST });
    const { data } = await axios.get(HERO_API);
    dispatch({ type: HERO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HERO_FAIL, payload: error.message });
  }
};

// Hero Actions
export const updateHero = (heroData) => async (dispatch) => {
  try {
    dispatch({ type: HERO_UPDATE_REQUEST });
    const { data } = await axiosInstance.put(HERO_API, heroData);
    dispatch({ type: HERO_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HERO_UPDATE_FAIL, payload: error.response?.data?.message || error.message });
  }
};
