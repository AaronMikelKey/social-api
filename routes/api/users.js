import express from "express";
import mongoose from "mongoose";
const router = express.Router();

import UserSchema from "../../models/User.js";

const users = mongoose.model("User", UserSchema);

// GET all users
router.get("/", (req, res) => {
  users
    .find({})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.error(err), res.json(err);
    });
});
// GET single user, thoughts, and friends
router.get("/:id", (req, res) => {
  users
    .findById(req.params.id)
    .then((dbUserData) =>
      res.json({
        username: dbUserData.username,
        thoughts: dbUserData.thoughts,
        friends: dbUserData.friends,
      })
    )
    .catch((err) => {
      console.error(err), res.json(err);
    });
});
// POST new user
router.post("/", (req, res) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
  };
  users
    .create(newUser)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.json(err.message));
});
// PUT user by id
router.put("/:id", (req, res) => {
  users
    .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.json({ message: "No user found with this ID" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.json(err));
});
// DELETE user by id
router.delete("/:id", (req, res) => {
  users
    .findByIdAndDelete(req.params.id)
    .then((dbUserData) => {
      if (!dbUserData) {
        res.json({ message: "No user found with this ID" });
        return;
      }
      res.json({ message: "User deleted." });
    })
    .catch((err) => res.json(err));
});
// POST new user friend
router.post("/:id/friends/:friendId", (req, res) => {
  users
    .findByIdAndUpdate(
      req.params.id,
      { $addToSet: { friends: req.params.friendId } }, // Only adds if not already added
      { new: true }
    )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.json({ message: "No user found with this ID" });
        return;
      }
      res.json({ message: "Friend Added." });
    })
    .catch((err) => res.json(err));
});
// DELETE user friend
router.delete("/:id/friends/:friendId", (req, res) => {});

export default router;
