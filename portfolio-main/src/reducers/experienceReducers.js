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
} from "../constants/portfolioconstants";

const initialState = {
  loading: false,
  data: [],
  error: null,
  addLoading: false,
  addError: null,
  addSuccess: false,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
};

export const experienceReducer = (state = initialState, action) => {
  switch (action.type) {
    // FETCH EXPERIENCE
    case EXPERIENCE_REQUEST:
      return { ...state, loading: true, error: null };
    case EXPERIENCE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case EXPERIENCE_FAIL:
      return { ...state, loading: false, error: action.payload };

    // ADD EXPERIENCE
    case EXPERIENCE_ADD_REQUEST:
      return { ...state, addLoading: true, addError: null, addSuccess: false };
    case EXPERIENCE_ADD_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        data: [...state.data, action.payload],
      };
    case EXPERIENCE_ADD_FAIL:
      return { ...state, addLoading: false, addError: action.payload };

    // DELETE EXPERIENCE
    case EXPERIENCE_DELETE_REQUEST:
      return { ...state, deleteLoading: true, deleteError: null, deleteSuccess: false };
    case EXPERIENCE_DELETE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        data: state.data.filter((exp) => exp._id !== action.payload),
      };
    case EXPERIENCE_DELETE_FAIL:
      return { ...state, deleteLoading: false, deleteError: action.payload };

    default:
      return state;
  }
};
