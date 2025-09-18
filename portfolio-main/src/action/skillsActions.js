import axios from "axios";
import {
  SKILLS_REQUEST,
  SKILLS_SUCCESS,
  SKILLS_FAIL,
  SKILLS_UPDATE_REQUEST,
  SKILLS_UPDATE_SUCCESS,
  SKILLS_UPDATE_FAIL,
  SKILLS_API,
} from "../constants/portfolioconstants";
import axiosInstance from "../utils/axiosInstance";

// Fetch skills
export const fetchSkills = () => async (dispatch) => {
  try {
    dispatch({ type: SKILLS_REQUEST });
    const { data } = await axios.get(SKILLS_API);
    dispatch({ type: SKILLS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SKILLS_FAIL, payload: error.message });
  }
};

// Skills Actions
export const updateSkills = (skillsData) => async (dispatch) => {
  try {
    dispatch({ type: SKILLS_UPDATE_REQUEST });
    const { data } = await axiosInstance.put(SKILLS_API, skillsData);
    dispatch({ type: SKILLS_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SKILLS_UPDATE_FAIL, payload: error.response?.data?.message || error.message });
  }
};

