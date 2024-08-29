import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  const q = "SELECT `username`,`email`,`img` FROM users WHERE id=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data[0]);
  });
};

export const updateUser = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid!");

    const { username, email } = req.body;
    const imgFileName = req.file ? req.file.filename : null;

    let q = "UPDATE users SET ";
    let values = [];

    const columns = [];
    if (username !== undefined) {
      columns.push("username = ?");
      values.push(username);
    }
    if (email !== undefined) {
      columns.push("email = ?");
      values.push(email);
    }
    if (imgFileName !== null) {
      columns.push("img = ?");
      values.push(imgFileName);
    }

    if (columns.length === 0) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    q += columns.join(", ");
    q += " WHERE id = ?";
    console.log("q:", q);
    values.push(userInfo.id);
    console.log("values", values);

    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Error updating user:", err);
        return res
          .status(500)
          .json({ message: "An error occurred while updating the user" });
      }
      return res.status(200).json(data[0]);
    });

    // const { username, email } = req.body;
    // console.log("username, email", username, email);

    // const q = "UPDATE users SET username=?,email=?,img=? WHERE id=?";

    // db.query(
    //   q,
    //   [username, email, req.file.filename, userInfo.id],
    //   (err, data) => {
    //     if (err) return res.status(500).send(err);

    //     return res.status(200).json(data[0]);
    //   }
    // );
  });
};
