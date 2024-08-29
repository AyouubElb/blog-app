import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
  // host: "basgsdixj2n9drntwojp-mysql.services.clever-cloud.com",
  // user: "u8cqwdws2xw1h2el",
  // password: "68eH5vBWdV4P0d3nnHgd",
  // database: "basgsdixj2n9drntwojp",
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    throw err;
  }
  console.log("Connected to database!");
});

db.on("error", (err) => {
  console.error("MySQL connection error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    // Reconnect if the connection is lost
    db.connect((err) => {
      if (err) {
        console.error("Error reconnecting to database:", err);
        throw err;
      }
      console.log("Reconnected to database!");
    });
  } else {
    // Handle other errors
    throw err;
  }
});
