import {
  SKILLS_REQUEST,
  SKILLS_SUCCESS,
  SKILLS_FAIL,
  SKILLS_UPDATE_REQUEST,
  SKILLS_UPDATE_SUCCESS,
  SKILLS_UPDATE_FAIL,
} from "../constants/portfolioconstants";

const initialState = {
  loading: false,
  data: null,
  error: null,
  updateLoading: false,
  updateError: null,
  updateSuccess: false,
};

export const skillsReducer = (state = initialState, action) => {
  switch (action.type) {
    // FETCH SKILLS
    case SKILLS_REQUEST:
      return { ...state, loading: true, error: null };
    case SKILLS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case SKILLS_FAIL:
      return { ...state, loading: false, error: action.payload };

    // UPDATE SKILLS
    case SKILLS_UPDATE_REQUEST:
      return { ...state, updateLoading: true, updateError: null, updateSuccess: false };
    case SKILLS_UPDATE_SUCCESS:
      return { ...state, updateLoading: false, updateSuccess: true, data: action.payload };
    case SKILLS_UPDATE_FAIL:
      return { ...state, updateLoading: false, updateError: action.payload };

    default:
      return state;
  }
};
