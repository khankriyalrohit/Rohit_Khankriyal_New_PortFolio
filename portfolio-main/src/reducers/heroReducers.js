// src/reducers/heroReducer.js
import {
  HERO_REQUEST,
  HERO_SUCCESS,
  HERO_FAIL,
  HERO_UPDATE_REQUEST,
  HERO_UPDATE_SUCCESS,
  HERO_UPDATE_FAIL,
} from "../constants/portfolioconstants";

const initialState = {
  loading: false,
  data: null,
  error: null,
  updateLoading: false,
  updateError: null,
  updateSuccess: false,
};

export const heroReducer = (state = initialState, action) => {
  switch (action.type) {
    // FETCH HERO
    case HERO_REQUEST:
      return { ...state, loading: true, error: null };
    case HERO_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case HERO_FAIL:
      return { ...state, loading: false, error: action.payload };

    // UPDATE HERO
    case HERO_UPDATE_REQUEST:
      return { ...state, updateLoading: true, updateError: null, updateSuccess: false };
    case HERO_UPDATE_SUCCESS:
      return { 
        ...state, 
        updateLoading: false, 
        updateSuccess: true, 
        data: action.payload 
      };
    case HERO_UPDATE_FAIL:
      return { ...state, updateLoading: false, updateError: action.payload };

    default:
      return state;
  }
};
