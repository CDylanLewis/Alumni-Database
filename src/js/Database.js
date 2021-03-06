const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "AdminLogin", // update me
      password: "misalumni1@" // update me
    },
    type: "default"
  },
  server: "misalumni.database.windows.net", // update me
  options: {
    database: "MISAlumni", //update me
    encrypt: true
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `SELECT * from dbo.Alumni`,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on("row", rows => {
    rows.forEach(row => {
      console.log(row.value);
    });
  });

  return connection.execSql(request);
}