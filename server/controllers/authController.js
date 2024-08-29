import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // CHECK EXISTING USER
  const selectQuery = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(
    selectQuery,
    [req.body.email, req.body.username],
    async (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(409).json("User already exists!");

      try {
        // Hash the password and create a user
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const insertQuery =
          "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";
        const values = [req.body.username, req.body.email, hash];

        db.query(insertQuery, values, (err, data) => {
          if (err) return res.json(err);
          return res.status(200).json("User has been created.");
        });
      } catch (error) {
        return res.json(error);
      }
    }
  );
};

export const login = (req, res) => {
  // CHECK EXISTING USER
  const selectQuery = "SELECT * FROM users WHERE username = ?";

  db.query(selectQuery, [req.body.username], async (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //CHECK PASSWORD
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      data[0].password
    );

    if (!isValidPassword)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);
    const { password, ...user } = data[0];

    res.status(200).json({ access_token: token, user });

    // res
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //     sameSite: "None",
    //     secure: false, // Set to false for development
    //     path: "/",
    //   })
    //   .status(200)
    //   .json(token, user);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
