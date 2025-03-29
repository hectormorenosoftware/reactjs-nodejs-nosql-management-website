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
  SORT_BY_LAST_NAME_REQUEST,
  SORT_BY_LAST_NAME_SUCCESS,
  SORT_BY_LAST_NAME_FAILURE,
  CHANGED_COLOR,
  RESET_DELETED_MESSAGE,
  UPDATE_NOTES_AND_TASK_REQUEST,
  UPDATE_NOTES_AND_TASK_SUCCESS,
  UPDATE_NOTES_AND_TASK_FAILURE,
  EDIT_SPRINT_OPTIONS_REQUEST,
  EDIT_SPRINT_OPTIONS_SUCCESS,
  EDIT_SPRINT_OPTIONS_FAILURE,
  GET_SPRINT_OPTIONS_REQUEST,
  GET_SPRINT_OPTIONS_SUCCESS,
  GET_SPRINT_OPTIONS_FAILURE,
} from "../../types";
import {
  getUsersTableData,
  getUserTableData,
  login,
  createAdminFunc,
  createEmployeeFunc,
  deleteEmployeeFunc,
  searchUserByNameFunc,
  searchUserByLastName,
  sortByFirstName,
  sortByLastName,
  updatesNotesAndProgress,
  editSprintOptions,
  getSprintOptions,
} from "../../api/api";

export function editSprintOptionsRedux(sprintStartedDate, sprintEndDate) {
  return async function (dispatch) {
    dispatch({ type: EDIT_SPRINT_OPTIONS_REQUEST });
    try {
      const data = await editSprintOptions(sprintStartedDate, sprintEndDate);

      return dispatch({ type: EDIT_SPRINT_OPTIONS_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: EDIT_SPRINT_OPTIONS_FAILURE });
      throw new Error(e);
    }
  };
}

export function getSprintOptionsRedux() {
  return async function (dispatch) {
    dispatch({ type: GET_SPRINT_OPTIONS_REQUEST });
    try {
      const data = await getSprintOptions();

      return dispatch({ type: GET_SPRINT_OPTIONS_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: GET_SPRINT_OPTIONS_FAILURE });
      throw new Error(e);
    }
  };
}

export function resetDeletedMessageRedux() {
  return function (dispatch) {
    dispatch({ type: RESET_DELETED_MESSAGE });
  };
}

export function changeColorRedux() {
  return function (dispatch) {
    dispatch({ type: CHANGED_COLOR });
  };
}

export function getUsersDataRedux() {
  return async function (dispatch) {
    dispatch({ type: GET_DATA });

    try {
      //this is where an axios get, post, delete, or put request will go for example axios.get("https://fetchdata.com");
      //this is where a fetch get, post, delete, put request will go for example fetch("https://fetchdata.com");

      const data = await getUsersTableData();

      return dispatch({ type: GET_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_DATA_ERROR });
      throw new Error(error);
    }
  };
}

export function getUserDataRedux(userName) {
  return async function (dispatch) {
    dispatch({ type: GET_USER_DATA });

    try {
      const data = await getUserTableData(userName);

      return dispatch({ type: GET_USER_DATA_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: GET_USER_DATA_ERROR });
      throw new Error(e);
    }
  };
}

export function loginRedux(userName, password) {
  return async function (dispatch) {
    dispatch({ type: LOGIN_REQUEST, payload: { userName } });

    try {
      const data = await login(userName, password);
      dispatch({ type: LOGIN_REQUEST_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: LOGIN_REQUEST_FAILURE });
      throw new Error(e);
    }
  };
}

export function createAdminRedux(name, lastName, userName, password, admin) {
  return async function (dispatch) {
    dispatch({ type: CREATE_ADMIN_REQUEST });

    try {
      const data = await createAdminFunc(
        name,
        lastName,
        userName,
        password,
        admin
      );

      dispatch({ type: CREATE_ADMIN_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: CREATE_ADMIN_FAILURE });
      throw new Error(e);
    }
  };
}

export function createEmployeeRedux(
  name,
  lastName,
  userName,
  personalEmail,
  phoneNumber,
  companyEmail,
  companyNumber,
  slackID,
  salary,
  companyRole,
  notes,
  progress
) {
  return async function (dispatch) {
    dispatch({ type: CREATE_EMPLOYEE_REQUEST });
    try {
      const data = await createEmployeeFunc(
        name,
        lastName,
        userName,
        personalEmail,
        phoneNumber,
        companyEmail,
        companyNumber,
        slackID,
        salary,
        companyRole,
        notes,
        progress
      );

      dispatch({ type: CREATE_EMPLOYEE_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: CREATE_EMPLOYEE_FAILURE });
      throw new Error(e);
    }
  };
}

export function updateTaskAndProgressRedux(
  name,
  lastName,
  userName,
  personalEmail,
  phoneNumber,
  companyEmail,
  companyNumber,
  slackID,
  salary,
  companyRole,
  notes,
  progress
) {
  return async function (dispatch) {
    dispatch({ type: UPDATE_NOTES_AND_TASK_REQUEST });
    const data = await updatesNotesAndProgress({
      name,
      lastName,
      userName,
      personalEmail,
      phoneNumber,
      companyEmail,
      companyNumber,
      slackID,
      salary,
      companyRole,
      notes,
      progress,
    });

    dispatch({ type: UPDATE_NOTES_AND_TASK_SUCCESS, payload: data });
    try {
    } catch (e) {
      dispatch({ type: UPDATE_NOTES_AND_TASK_FAILURE });
      throw new Error(e);
    }
  };
}

export function deleteEmployeeRedux(userName) {
  return async function (dispatch) {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
      const data = await deleteEmployeeFunc(userName);

      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: DELETE_USER_FAILURE });
      throw new Error(e);
    }
  };
}

export function searchUserByNameRedux(name) {
  return async function (dispatch) {
    dispatch({ type: SEARCH_BY_NAME_REQUEST });
    try {
      const data = await searchUserByNameFunc(name);
      dispatch({ type: SEARCH_BY_NAME_SUCCESS, payload: data });
      return data;
    } catch (e) {
      dispatch({ type: SEARCH_BY_NAME_FAILURE });
      throw new Error(e);
    }
  };
}

export function searchByLastNameRedux(lastName) {
  return async function (dispatch) {
    dispatch({ type: SEARCH_BY_LAST_NAME_REQUEST });

    try {
      const data = await searchUserByLastName(lastName);
      dispatch({ type: SEARCH_BY_LAST_NAME_SUCCESS, payload: data });

      return data;
    } catch (e) {
      dispatch({ type: SEARCH_BY_LAST_NAME_FAILURE });
      throw new Error(e);
    }
  };
}

export function sortByFirstNameRedux() {
  return async function (dispatch) {
    dispatch({ type: SORT_BY_FIRST_NAME_REQUEST });
    try {
      const data = await sortByFirstName();

      dispatch({ type: SORT_BY_FIRST_NAME_SUCCESS, payload: data });

      return data;
    } catch (e) {
      dispatch({ type: SORT_BY_FIRST_NAME_FAILURE });
      throw new Error(e);
    }
  };
}

export function sortByLastNameRedux() {
  return async function (dispatch) {
    dispatch({ type: SORT_BY_LAST_NAME_REQUEST });
    try {
      const data = await sortByLastName();

      dispatch({ type: SORT_BY_LAST_NAME_SUCCESS, payload: data });

      return data;
    } catch (e) {
      dispatch({ type: SORT_BY_LAST_NAME_FAILURE });
      throw new Error(e);
    }
  };
}

export function resetMessageRedux() {
  return function (dispatch) {
    dispatch({ type: RESET_MESSAGE });
  };
}

export function resetAllDataRedux() {
  return function (dispatch) {
    dispatch({ type: RESET_ALL_DATA });
  };
}
