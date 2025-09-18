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

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    // FETCH PROJECTS
    case PROJECT_REQUEST:
      return { ...state, loading: true, error: null };
    case PROJECT_SUCCESS:
      return { ...state, loading: false, data: action.payload.projects };
    case PROJECT_FAIL:
      return { ...state, loading: false, error: action.payload };

    // ADD PROJECT
    case PROJECT_ADD_REQUEST:
      return { ...state, addLoading: true, addError: null, addSuccess: false };
    case PROJECT_ADD_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        data: [...state.data, action.payload],
      };
    case PROJECT_ADD_FAIL:
      return { ...state, addLoading: false, addError: action.payload };

    // DELETE PROJECT
    case PROJECT_DELETE_REQUEST:
      return { ...state, deleteLoading: true, deleteError: null, deleteSuccess: false };
    case PROJECT_DELETE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        data: state.data.filter((proj) => proj._id !== action.payload),
      };
    case PROJECT_DELETE_FAIL:
      return { ...state, deleteLoading: false, deleteError: action.payload };

    default:
      return state;
  }
};
