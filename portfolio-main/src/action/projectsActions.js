import axios from "axios";
import {
  PROJECT_REQUEST,
  PROJECT_SUCCESS,
  PROJECT_FAIL,
  PROJECT_ADD_REQUEST,
  PROJECT_ADD_SUCCESS,
  PROJECT_ADD_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_API,
} from "../constants/portfolioconstants";
import axiosInstance from "../utils/axiosInstance";

// Fetch all projects
export const fetchProjects = () => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_REQUEST });
    const { data } = await axios.get(PROJECT_API);
    dispatch({ type: PROJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PROJECT_FAIL, payload: error.message });
  }
};

export const addProject = (projectData) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_ADD_REQUEST });
    const { data } = await axiosInstance.post(PROJECT_API, projectData);
    dispatch({ type: PROJECT_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PROJECT_ADD_FAIL, payload: error.response?.data?.message || error.message });
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_DELETE_REQUEST });
    await axiosInstance.delete(`${PROJECT_API}/${id}`);
    dispatch({ type: PROJECT_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: PROJECT_DELETE_FAIL, payload: error.response?.data?.message || error.message });
  }
};
