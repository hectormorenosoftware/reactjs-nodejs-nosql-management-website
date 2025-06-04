import {
  GET_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_SUCCESS,
  CREATE_ADMIN_FAILURE,
  RESET_MESSAGE,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAILURE,
  RESET_ALL_DATA,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  SEARCH_BY_NAME_REQUEST,
  SEARCH_BY_NAME_SUCCESS,
  SEARCH_BY_NAME_FAILURE,
  SEARCH_BY_LAST_NAME_REQUEST,
  SEARCH_BY_LAST_NAME_SUCCESS,
  SEARCH_BY_LAST_NAME_FAILURE,
  SORT_BY_FIRST_NAME_REQUEST,
  SORT_BY_FIRST_NAME_SUCCESS,
  SORT_BY_FIRST_NAME_FAILURE,
  SORT_BY_LAST_NAME_SUCCESS,
  SORT_BY_LAST_NAME_REQUEST,
  SORT_BY_LAST_NAME_FAILURE,
  CHANGED_COLOR,
  RESET_DELETED_MESSAGE,
  UPDATE_NOTES_AND_TASK_REQUEST,
  UPDATE_NOTES_AND_TASK_SUCCESS,
  UPDATE_NOTES_AND_TASK_FAILURE,
} from "../../types";

const INTIAL_STATE = {
  error: false,
  loading: false,
  data: [],
  loginSuccess: false,
  createAdminMessage: "",
  createEmployeeMessage: "",
  deletedEmployeeMessage: "",
  userName: "",
  errorMessage: "",
  changedColor: false,
};

function userReducer(state = INTIAL_STATE, action) {
  switch (action.type) {
    case RESET_DELETED_MESSAGE:
      return {
        ...state,
        deletedEmployeeMessage: "",
      };
    case CHANGED_COLOR:
      return {
        ...state,
        changedColor: !state.changedColor,
      };
    case GET_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        data: [...action.payload.arrayData],
        loading: false,
      };
    case GET_DATA_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        data: [],
      };
    case GET_USER_DATA:
      return {
        ...state,
        error: false,
        loading: true,
        data: [],
      };
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: [...action.payload],
      };
    case GET_USER_DATA_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        data: [],
      };
    case SEARCH_BY_NAME_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        data: [],
      };
    case SEARCH_BY_NAME_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: [...action.payload.arrayData],
      };
    case SEARCH_BY_NAME_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        data: [],
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        data: [],
        loginSuccess: false,
        userName: action.payload.userName,
      };
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: [],
        loginSuccess: action.payload.loginSuccess,
        errorMessage: action.payload.errorMessage,
      };
    case LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        error: false,
        loading: false,
        data: [],
        loginSuccess: false,
        userName: "",
      };
    case CREATE_ADMIN_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        createAdminMessage: "",
      };
    case CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        createAdminMessage: "Successfully Created Admin",
      };
    case CREATE_ADMIN_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        createAdminMessage: "",
      };
    case RESET_MESSAGE:
      return {
        ...state,
        createAdminMessage: "",
        createEmployeeMessage: "",
      };
    case CREATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        createEmployeeMessage: "",
      };
    case CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        createEmployeeMessage: action.payload.message,
        data: [...action.payload.data],
      };
    case CREATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: false,
        loading: false,
        createEmployeeMessage: "",
      };
    case DELETE_USER_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        deletedEmployeeMessage: "",
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        deletedEmployeeMessage: action.payload.message,
        data: [...action.payload.data],
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        deletedEmployeeMessage: "",
      };

    case SEARCH_BY_LAST_NAME_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        data: [],
      };

    case SEARCH_BY_LAST_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: [...action.payload.arrayData],
      };

    case SEARCH_BY_LAST_NAME_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        data: [],
      };

    case SORT_BY_FIRST_NAME_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        data: [],
      };
    case SORT_BY_FIRST_NAME_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: [...action.payload.arrayData],
      };
    case SORT_BY_FIRST_NAME_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        data: [],
      };
    case SORT_BY_LAST_NAME_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        data: [],
      };
    case SORT_BY_LAST_NAME_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: [...action.payload.arrayData],
      };

    case SORT_BY_LAST_NAME_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        data: [],
      };

    case UPDATE_NOTES_AND_TASK_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case UPDATE_NOTES_AND_TASK_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: [...action.payload.data],
      };
    case UPDATE_NOTES_AND_TASK_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        data: [],
      };

    case RESET_ALL_DATA:
      return { ...INTIAL_STATE, changedColor: state.changedColor };
    default:
      return state;
  }
}

export default userReducer;
