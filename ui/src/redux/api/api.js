import axios from "axios";

async function getUsersTableData() {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/get-accounts";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/get-accounts";
    }

    const data = await axios.get(url);

    return data.data;
  } catch (e) {
    throw new Error(e);
  }
}

async function getUserTableData(userName) {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = `http://localhost:5000/get-user-account?userName=${userName}`;
    }
    if (process.env.NODE_ENV === "production") {
      url = `http://localhost:5000/get-user-account?userName=${userName}`;
    }

    //axios and fetch in this scenario is the same syntax because
    //you can't send a body on a GET request using axios or fetch
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const res = await fetch(url, {
      method: "GET",
      headers: myHeaders,
    });

    const data = await res.json();

    return data;
  } catch (e) {
    throw new Error(e);
  }
}

async function login(userName, password) {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/login";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/login";
    }

    //axios and fetch in this scenario is the same syntax because
    //you can't send a body on a GET request using axios or fetch

    const data = await axios(url, {
      params: { userName: userName, password: password },
    });

    return data.data;
  } catch (e) {
    throw new Error(e);
  }
}

async function createAdminFunc(name, lastName, userName, password, admin) {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = `http://localhost:5000/create-account/${name}/${lastName}/${userName}/${admin}/${password}`;
    }
    if (process.env.NODE_ENV === "production") {
      url = `http://localhost:5000/create-account/${name}/${lastName}/${userName}/${admin}/${password}`;
    }

    //axios and fetch in this scenario is the same syntax because
    //you can't send a body on a GET request using axios or fetch

    const data = await axios.post(url);

    return data.data;
  } catch (e) {
    throw new Error(e);
  }
}

async function createEmployeeFunc(
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
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/create-employee";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/create-employee";
    }

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const data = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        lastName: lastName,
        userName: userName,
        personalEmail: personalEmail,
        phoneNumber: phoneNumber,
        companyEmail: companyEmail,
        companyNumber: companyNumber,
        slackID: slackID,
        salary: salary,
        companyRole: companyRole,
        notes: notes,
        progress: progress,
      }),
      headers: myHeaders,
    });

    const res = await data.json();

    return res;
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteEmployeeFunc(userName) {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/delete-employee";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/delete-employee";
    }

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const data = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        userName: userName,
      }),
      headers: myHeaders,
    });

    const res = await data.json();

    return res;
  } catch (e) {
    throw new Error(e);
  }
}

async function searchUserByNameFunc(name) {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/search-by-first-name";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/search-by-first-name";
    }

    const data = await axios(url, { params: { name: name } });

    return data.data;
  } catch (e) {
    throw new Error(e);
  }
}

async function searchUserByLastName(lastName) {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/search-by-last-name";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/search-by-last-name";
    }

    const data = await axios(url, { params: { lastName: lastName } });

    return data.data;
  } catch (e) {
    throw new Error(e);
  }
}

async function sortByFirstName() {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/sort-by-name";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/sort-by-name";
    }

    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (e) {
    throw new Error(e);
  }
}

async function sortByLastName() {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/sort-by-last-name";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/sort-by-last-name";
    }

    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (e) {
    throw new Error(e);
  }
}

async function updatesNotesAndProgress(details) {
  const {
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
  } = details;

  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/update-user-notes-and-progress";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/update-user-notes-and-progress";
    }
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        lastName: lastName,
        userName: userName,
        personalEmail: personalEmail,
        phoneNumber: phoneNumber,
        companyEmail: companyEmail,
        companyNumber: companyNumber,
        slackID: slackID,
        salary: salary,
        companyRole: companyRole,
        notes: notes,
        progress: progress,
      }),
      headers: myHeaders,
    });
    const data = await res.json();

    return data;
  } catch (e) {
    throw new Error(e);
  }
}

async function editSprintOptions(sprintStartedDate, sprintEndDate) {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/edit-sprint-options";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/edit-sprint-options";
    }
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        sprintStartedDate,
        sprintEndDate,
      }),
      headers: myHeaders,
    });

    const data = await res.json();

    return data;
  } catch (e) {
    throw new Error(e);
  }
}

async function getSprintOptions() {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/sprint-options-details";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/sprint-options-details";
    }

    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (e) {
    throw new Error(e);
  }
}

export {
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
};
