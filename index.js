const express = require("express");
const bodyParser = require("body-parser");
const cluster = require("cluster");
const cors = require("cors");
const numCPUs = require("os").cpus().length;
const fs = require("fs");

function sortFunc(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function sortLastName(a, b) {
  if (a.lastName < b.lastName) {
    return -1;
  }
  if (a.lastName > b.lastName) {
    return 1;
  }
  return 0;
}

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    // Create a worker
    console.log(`cluster forked for server at cpu number ${i}`);
    cluster.fork();
  }
} else {
  // Workers share the TCP connection in this server
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.static("build"));

  app.get("/get-accounts", (req, res) => {
    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonData = JSON.parse(rawData);
      const arrayData = Object.values(jsonData);
      const sumAllSalaries = arrayData.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.salary);
      }, 0);

      return res.send({
        arrayData: arrayData.sort(sortFunc),
        sumAllSalaries,
      });
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_prod.json");
      const jsonData = JSON.parse(rawData);
      const arrayData = Object.values(jsonData);

      const sumAllSalaries = arrayData.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.salary);
      }, 0);

      return res.send({ arrayData: arrayData.sort(sortFunc), sumAllSalaries });
    }
    return res.send([]);
  });

  app.get("/get-user-account", (req, res) => {
    const { userName } = req.query;

    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonData = JSON.parse(rawData);

      if (jsonData[userName] === undefined) {
        return res.send([]);
      }
      return res.send([jsonData[userName]]);
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_prod.json");
      const jsonData = JSON.parse(rawData);

      if (jsonData[userName] === undefined) {
        return res.send([]);
      }
      return res.send([jsonData[userName]]);
    }

    return res.send([]);
  });

  app.get("/login", (req, res) => {
    const { userName, password } = req.query;

    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync(
        "./nosqldatabase/administrators_dev.json"
      );
      const jsonData = JSON.parse(rawData);

      if (jsonData[userName] === undefined) {
        return res.send({
          loginSuccess: false,
          errorMessage: "User does not exist",
        });
      }

      if (jsonData[userName].password === password) {
        return res.send({ loginSuccess: true, errorMessage: "" });
      }
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync(
        "./nosqldatabase/administrators_prod.json"
      );
      const jsonData = JSON.parse(rawData);

      if (jsonData[userName] === undefined) {
        return res.send({
          loginSuccess: false,
          errorMessage: "User does not exist",
        });
      }

      if (jsonData[userName].password === password) {
        return res.send({ loginSuccess: true, errorMessage: "" });
      }
    }

    return res.send({ loginSuccess: false, errorMessage: "Wrong password" });
  });

  app.post(
    "/create-account/:name/:lastName/:userName/:admin/:password",
    (req, res) => {
      const { name, lastName, userName, admin, password } = req.params;

      if (process.env.NODE_ENV === "development") {
        const rawData = fs.readFileSync(
          "./nosqldatabase/administrators_dev.json"
        );
        const jsonDataToModify = JSON.parse(rawData);

        jsonDataToModify[userName] = {
          name,
          lastName,
          userName,
          admin,
          password,
        };

        const jsonDataToWrite = JSON.stringify(jsonDataToModify);
        fs.writeFileSync(
          "./nosqldatabase/administrators_dev.json",
          jsonDataToWrite
        );

        return res.send(`Successfully created account`);
      }

      if (process.env.NODE_ENV === "production") {
        const rawData = fs.readFileSync(
          "./nosqldatabase/administrators_prod.json"
        );
        const jsonDataToModify = JSON.parse(rawData);

        jsonDataToModify[userName] = {
          name,
          lastName,
          userName,
          admin,
          password,
        };

        const jsonDataToWrite = JSON.stringify(jsonDataToModify);
        fs.writeFileSync(
          "./nosqldatabase/administrators_prod.json",
          jsonDataToWrite
        );

        return res.send(`Successfully created account`);
      }
      res.send("Could not create user");
    }
  );

  app.post("/create-employee", (req, res) => {
    const {
      name,
      lastName,
      personalEmail,
      userName,
      phoneNumber,
      companyEmail,
      companyNumber,
      slackID,
      salary,
      companyRole,
      notes,
      progress,
    } = req.body;

    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonDataToModify = JSON.parse(rawData);

      jsonDataToModify[userName] = {
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
      };

      const jsonDataToWrite = JSON.stringify(jsonDataToModify);
      fs.writeFileSync("./nosqldatabase/accounts_dev.json", jsonDataToWrite);

      const dataToSend = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonToSend = JSON.parse(dataToSend);
      const arrToSend = Object.values(jsonToSend);

      const sumAllSalaries = arrToSend.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.salary);
      }, 0);

      return res.send({
        message: "Successfully created employee",
        data: arrToSend.sort(sortFunc),
        sumAllSalaries,
      });
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_prod.json");
      const jsonDataToModify = JSON.parse(rawData);

      jsonDataToModify[userName] = {
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
      };

      const jsonDataToWrite = JSON.stringify(jsonDataToModify);
      fs.writeFileSync("./nosqldatabase/accounts_prod.json", jsonDataToWrite);

      const dataToSend = fs.readFileSync("./nosqldatabase/accounts_prod.json");
      const jsonToSend = JSON.parse(dataToSend);
      const arrToSend = Object.values(jsonToSend);

      const sumAllSalaries = arrToSend.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.salary);
      }, 0);

      return res.send({
        message: "Successfully created employee",
        data: arrToSend.sort(sortFunc),
        sumAllSalaries,
      });
    }
    res.send("Could not create employee");
  });

  app.delete("/delete-employee", (req, res) => {
    const { userName } = req.body;

    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonDataToModify = JSON.parse(rawData);
      const userFirstName = jsonDataToModify[userName].name;
      const userLastName = jsonDataToModify[userName].lastName;
      const companyRole = jsonDataToModify[userName].companyRole;

      delete jsonDataToModify[userName];

      const jsonDataToWrite = JSON.stringify(jsonDataToModify);
      fs.writeFileSync("./nosqldatabase/accounts_dev.json", jsonDataToWrite);

      const dataToSend = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonToSend = JSON.parse(dataToSend);
      const arrToSend = Object.values(jsonToSend);

      const sumAllSalaries = arrToSend.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.salary);
      }, 0);

      return res.send({
        message: `Successfully deleted ${companyRole}: ${userFirstName} ${userLastName}`,
        data: arrToSend.sort(sortFunc),
        sumAllSalaries,
      });
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_prod.json");
      const jsonDataToModify = JSON.parse(rawData);
      const userFirstName = jsonDataToModify[userName].name;
      const userLastName = jsonDataToModify[userName].lastName;
      const companyRole = jsonDataToModify[userName].companyRole;

      delete jsonDataToModify[userName];

      const jsonDataToWrite = JSON.stringify(jsonDataToModify);
      fs.writeFileSync("./nosqldatabase/accounts_prod.json", jsonDataToWrite);

      const dataToSend = fs.readFileSync("./nosqldatabase/accounts_prod.json");
      const jsonToSend = JSON.parse(dataToSend);
      const arrToSend = Object.values(jsonToSend);

      const sumAllSalaries = arrToSend.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.salary);
      }, 0);

      return res.send({
        message: `Successfully deleted ${companyRole}: ${userFirstName} ${userLastName}`,
        data: arrToSend.sort(sortFunc),
        sumAllSalaries,
      });
    }

    res.send("Could not delete employee");
  });

  app.get("/search-by-first-name", (req, res) => {
    const { name } = req.query;

    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonData = JSON.parse(rawData);
      const arrayData = Object.values(jsonData);
      const filteredArray = arrayData.filter((value) => {
        return value.name === name;
      });
      const sumAllSalaries = filteredArray.reduce(
        (accumulator, currentValue) => {
          return accumulator + Number(currentValue.salary);
        },
        0
      );

      return res.send({
        arrayData: filteredArray.sort(sortFunc),
        sumAllSalaries,
      });
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_prod.json");
      const jsonData = JSON.parse(rawData);
      const arrayData = Object.values(jsonData);
      const filteredArray = arrayData.filter((value) => {
        return value.name === name;
      });
      const sumAllSalaries = filteredArray.reduce(
        (accumulator, currentValue) => {
          return accumulator + Number(currentValue.salary);
        },
        0
      );

      return res.send({
        arrayData: filteredArray.sort(sortFunc),
        sumAllSalaries,
      });
    }
    return res.send([]);
  });

  app.get("/search-by-last-name", (req, res) => {
    const { lastName } = req.query;

    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonData = JSON.parse(rawData);
      const arrayData = Object.values(jsonData);
      const filteredArray = arrayData.filter((value) => {
        return value.lastName === lastName;
      });
      const sumAllSalaries = filteredArray.reduce(
        (accumulator, currentValue) => {
          return accumulator + Number(currentValue.salary);
        },
        0
      );

      return res.send({
        arrayData: filteredArray.sort(sortFunc),
        sumAllSalaries,
      });
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_prod.json");
      const jsonData = JSON.parse(rawData);
      const arrayData = Object.values(jsonData);
      const filteredArray = arrayData.filter((value) => {
        return value.lastName === lastName;
      });
      const sumAllSalaries = filteredArray.reduce(
        (accumulator, currentValue) => {
          return accumulator + Number(currentValue.salary);
        },
        0
      );

      return res.send({
        arrayData: filteredArray.sort(sortFunc),
        sumAllSalaries,
      });
    }
    return res.send([]);
  });

  app.get("/sort-by-name", (req, res) => {
    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonData = JSON.parse(rawData);
      const arrayData = Object.values(jsonData);
      const sumAllSalaries = arrayData.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.salary);
      }, 0);

      return res.send({
        arrayData: arrayData.sort(sortFunc),
        sumAllSalaries,
      });
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_prod.json");
      const jsonData = JSON.parse(rawData);
      const arrayData = Object.values(jsonData);

      const sumAllSalaries = arrayData.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.salary);
      }, 0);

      return res.send({ arrayData: arrayData.sort(sortFunc), sumAllSalaries });
    }
    return res.send([]);
  });

  app.get("/sort-by-last-name", (req, res) => {
    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonData = JSON.parse(rawData);
      const arrayData = Object.values(jsonData);
      const sumAllSalaries = arrayData.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.salary);
      }, 0);

      return res.send({
        arrayData: arrayData.sort(sortLastName),
        sumAllSalaries,
      });
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_prod.json");
      const jsonData = JSON.parse(rawData);
      const arrayData = Object.values(jsonData);

      const sumAllSalaries = arrayData.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.salary);
      }, 0);

      return res.send({
        arrayData: arrayData.sort(sortLastName),
        sumAllSalaries,
      });
    }
    return res.send([]);
  });

  app.put("/update-user-notes-and-progress", (req, res) => {
    const {
      name,
      lastName,
      personalEmail,
      userName,
      phoneNumber,
      companyEmail,
      companyNumber,
      slackID,
      salary,
      companyRole,
      notes,
      progress,
    } = req.body;

    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonDataToModify = JSON.parse(rawData);

      jsonDataToModify[userName] = {
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
      };

      const jsonDataToWrite = JSON.stringify(jsonDataToModify);
      fs.writeFileSync("./nosqldatabase/accounts_dev.json", jsonDataToWrite);

      const dataToSend = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonToSend = JSON.parse(dataToSend);
      const arrToSend = Object.values(jsonToSend);

      const sumAllSalaries = arrToSend.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.salary);
      }, 0);

      return res.send({
        message: "Successfully updates notes and progress for task",
        data: arrToSend.sort(sortFunc),
        sumAllSalaries,
      });
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_prod.json");
      const jsonDataToModify = JSON.parse(rawData);

      jsonDataToModify[userName] = {
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
      };

      const jsonDataToWrite = JSON.stringify(jsonDataToModify);
      fs.writeFileSync("./nosqldatabase/accounts_prod.json", jsonDataToWrite);

      const dataToSend = fs.readFileSync("./nosqldatabase/accounts_prod.json");
      const jsonToSend = JSON.parse(dataToSend);
      const arrToSend = Object.values(jsonToSend);

      const sumAllSalaries = arrToSend.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.salary);
      }, 0);

      return res.send({
        message: "Successfully updates notes and progress for task",
        data: arrToSend.sort(sortFunc),
        sumAllSalaries,
      });
    }
  });

  app.post("/edit-sprint-options", (req, res) => {
    const { sprintStartedDate, sprintEndDate } = req.body;

    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./nosqldatabase/sprintoptions_dev.json");
      const jsonDataToModify = JSON.parse(rawData);

      jsonDataToModify["sprint-options"] = {
        sprintStartedDate,
        sprintEndDate,
      };

      const jsonDataToWrite = JSON.stringify(jsonDataToModify);
      fs.writeFileSync(
        "./nosqldatabase/sprintoptions_dev.json",
        jsonDataToWrite
      );

      const dataToSend = fs.readFileSync(
        "./nosqldatabase/sprintoptions_dev.json"
      );
      const jsonToSend = JSON.parse(dataToSend);
      const arrToSend = Object.values(jsonToSend);

      return res.send({
        message: "Successfully updated sprint options",
        data: arrToSend[0],
      });
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync(
        "./nosqldatabase/sprintoptions_prod.json"
      );
      const jsonDataToModify = JSON.parse(rawData);

      jsonDataToModify["sprint-options"] = {
        sprintStartedDate,
        sprintEndDate,
      };

      const jsonDataToWrite = JSON.stringify(jsonDataToModify);
      fs.writeFileSync(
        "./nosqldatabase/sprintoptions_prod.json",
        jsonDataToWrite
      );

      const dataToSend = fs.readFileSync(
        "./nosqldatabase/sprintoptions_prod.json"
      );
      const jsonToSend = JSON.parse(dataToSend);
      const arrToSend = Object.values(jsonToSend);

      return res.send({
        message: "Successfully updated sprint options",
        data: arrToSend[0],
      });
    }
  });

  app.get("/sprint-options-details", (req, res) => {
    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./nosqldatabase/sprintoptions_dev.json");
      const jsonDataToModify = JSON.parse(rawData);
      const arrData = Object.values(jsonDataToModify);

      return res.send({ data: arrData[0] });
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync(
        "./nosqldatabase/sprintoptions_prod.json"
      );
      const jsonDataToModify = JSON.parse(rawData);
      const arrayData = Object.values(jsonDataToModify);

      return res.send({ data: arrayData[0] });
    }
  });

  // All workers use this port
  app.listen(process.env.PORT || 5000, () => {
    console.log(`server listenting in port ${process.env.PORT || 5000}`);
  });
}
