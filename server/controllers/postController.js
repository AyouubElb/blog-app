import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const allPosts = (req, res) => {
  const { cat, id } = req.query;

  let query = "SELECT * FROM posts";
  let queryParams = [];

  if (cat) {
    query += " WHERE cat = ?";
    queryParams.push(cat);
  }

  if (cat && id) {
    query += " AND id != ?";
    queryParams.push(id);
  }

  query += " ORDER BY id DESC";

  db.query(query, queryParams, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    return res.status(200).json(data);
  });
};

// export const allPosts = (req, res) => {
//   const q = req.query.cat
//     ? "SELECT * FROM posts WHERE cat=? ORDER BY id DESC"
//     : "SELECT * FROM posts ORDER BY id DESC";

//   db.query(q, [req.query.cat], (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     return res.status(200).json(data);
//   });
// };

export const getPost = (req, res) => {
  const q =
    "SELECT p.id,`username`,`title`,`description`,p.img, u.img AS userImg,`cat`,`date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid!");

    const q =
      "INSERT INTO posts(`title`, `description`, `img`, `cat`, `date`, `uid`) VALUES(?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.file.filename,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: err });
      }

      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.status(200).json("Post has been deleted!");
    });
  });
};

// export const updatePost = (req, res) => {
//   console.log("req.params.id", req.params.id);
//   const token = req.headers.authorization;
//   if (!token) return res.status(401).json("Not authenticated!");

//   jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, userInfo) => {
//     if (err) return res.status(403).json("Token not valid!");

//     const postId = req.params.id;

//     const q =
//       "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

//     const values = [
//       req.body.title,
//       req.body.desc,
//       req.file.filename,
//       req.body.cat,
//     ];

//     db.query(q, [...values, postId, userInfo.id], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.json("Post has been updated.");
//     });
//   });
// };
export const updatePost = (req, res) => {
  console.log(req.body.title, req.file.filename, req.body.cat);
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Not authenticated!" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json({ message: "Token not valid!" });

    const postId = req.params.id;

    const q =
      "UPDATE posts SET `title`=?,`description`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [
      req.body.title,
      req.body.desc,
      req.file.filename,
      req.body.cat,
    ];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Error updating post", error: err });
      }
      return res.json({ message: "Post has been updated." });
    });
  });
};
