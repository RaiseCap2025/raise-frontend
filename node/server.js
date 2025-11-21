const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const snowflake = require("snowflake-sdk");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const connection = snowflake.createConnection({
  account: process.env.SNOWFLAKE_ACCOUNT,
  username: process.env.SNOWFLAKE_USER,
  password: process.env.SNOWFLAKE_PASSWORD,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE,
  database: process.env.SNOWFLAKE_DATABASE,
  schema: process.env.SNOWFLAKE_SCHEMA,
});

connection.connect((err, conn) => {
  if (err) {
    console.error("Unable to connect: " + err.message);
  } else {
    console.log("Connected to Snowflake!");
  }
});

app.get("/api/data", (req, res) => {
  const query = "SELECT * FROM snow_cap_raise.R_raise_user LIMIT 10;"; // Replace with real table
  connection.execute({
    sqlText: query,
    complete: (err, stmt, rows) => {
      if (err) {
        console.error("Query failed: " + err.message);
        res.status(500).send("Error fetching data");
      } else {
        res.json(rows);
      }
    },
  });
});

app.post("/api/v2/statements", (req, res) => {
  console.log("Received request body:", req.body);
  console.log("Received request params:", req.params);
  // const query = "SELECT * FROM R_raise_user LIMIT 10;"; // Replace with real table
  connection.execute({
    sqlText: req.body?.statement || "SELECT CURRENT_TIMESTAMP();",
    complete: (err, stmt, rows) => {
      if (err) {
        console.error("Query failed: " + err.message);
        res.status(500).send("Error fetching data");
      } else {
        res.json(rows);
      }
    },
  });
});
app.get("/api/procedure", (req, res) => {
  const query = "CALL snow_cap_raise.SP_LIST_TABLES();"; // Replace with real table
  connection.execute({
    sqlText: query,
    complete: (err, stmt, rows) => {
      if (err) {
        console.error("Query failed: " + err.message);
        res.status(500).send("Error fetching data");
      } else {
        res.json(rows);
      }
    },
  });
});
app.get("/api/files", (req, res) => {
  const query = "list @RAG_PIPELINE_STAGE;"; // Replace with real table
  connection.execute({
    sqlText: query,
    complete: (err, stmt, rows) => {
      if (err) {
        console.error("Query failed: " + err.message);
        res.status(500).send("Error fetching data");
      } else {
        res.json(rows);
      }
    },
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
