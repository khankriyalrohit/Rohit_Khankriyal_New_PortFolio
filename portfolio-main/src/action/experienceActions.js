import axios from "axios";
import {
  EXPERIENCE_REQUEST,
  EXPERIENCE_SUCCESS,
  EXPERIENCE_FAIL,
  EXPERIENCE_ADD_REQUEST,
  EXPERIENCE_ADD_SUCCESS,
  EXPERIENCE_ADD_FAIL,
  EXPERIENCE_DELETE_REQUEST,
  EXPERIENCE_DELETE_SUCCESS,
  EXPERIENCE_DELETE_FAIL,
  EXPERIENCE_API,
} from "../constants/portfolioconstants";
import axiosInstance from "../utils/axiosInstance";

// Fetch experience
export const fetchExperience = () => async (dispatch) => {
  try {
    dispatch({ type: EXPERIENCE_REQUEST });
    const { data } = await axiosInstance.get(EXPERIENCE_API);
    dispatch({ type: EXPERIENCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXPERIENCE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const addExperience = (expData) => async (dispatch) => {
  try {
    dispatch({ type: EXPERIENCE_ADD_REQUEST });
    const { data } = await axiosInstance.post(EXPERIENCE_API, expData);
    dispatch({ type: EXPERIENCE_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EXPERIENCE_ADD_FAIL, payload: error.response?.data?.message || error.message });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    dispatch({ type: EXPERIENCE_DELETE_REQUEST });
    await axiosInstance.delete(`${EXPERIENCE_API}/${id}`);
    dispatch({ type: EXPERIENCE_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: EXPERIENCE_DELETE_FAIL, payload: error.response?.data?.message || error.message });
  }
};

