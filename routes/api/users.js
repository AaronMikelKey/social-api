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
router.post("/", (req, res) => {});
// PUT user by id
router.put("/:id", (req, res) => {});
// DELETE user by id
router.delete("/:id", (req, res) => {});
// POST new user friend
router.post("/:id/friends/:friendId", (req, res) => {});
// DELETE user friend
router.delete("/:id/friends/:friendId", (req, res) => {});

export default router;
