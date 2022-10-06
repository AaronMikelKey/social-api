import express from "express";
import mongoose from "mongoose";
const router = express.Router();

import ThoughtSchema from "../../models/Thought.js";
import UserSchema from "../../models/User.js";

const thoughts = mongoose.model("Thought", ThoughtSchema);
const users = mongoose.model("User", UserSchema);

// GET all thoughts
router.get("/", (req, res) => {
  thoughts
    .find({})
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.error(err), res.json(err);
    });
});
// GET single thought
router.get("/:id", (req, res) => {
  thoughts
    .findById(req.params.id)
    .then((dbData) =>
      res.json({
        username: dbData.username,
        thoughtText: dbData.thoughtText,
        createdAt: dbData.createdAt,
      })
    )
    .catch((err) => {
      console.error(err), res.json(err);
    });
});
// POST new thought
router.post("/", (req, res) => {
  const newThought = {
    thoughtText: req.body.thoughtText,
    username: req.body.username,
  };

  thoughts
    .create(newThought)
    .then((dbThoughtData) => {
      users
        .findOneAndUpdate(
          { username: newThought.username },
          {
            $addToSet: { thoughts: dbThoughtData._id },
          }
        )
        .then(res.json(dbThoughtData))
        .catch((err) => res.json(err.message));
    })
    .catch((err) => res.json(err.message));
});
// PUT thought by id
router.put("/:id", (req, res) => {
  thoughts
    .findByIdAndUpdate(
      req.params.id,
      { thoughtText: req.body.thoughtText },
      { new: true }
    )
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.json(err.message));
});
// DELETE thought by id
router.delete("/:id", (req, res) => {
  thoughts
    .findByIdAndDelete(req.params.id, { new: true })
    .then((dbThoughtData) => res.json({ message: "Thought Deleted." }))
    .catch((err) => res.json(err.message));
});
// POST new thought reaction
router.post("/:id/reactions", (req, res) => {
  const newReaction = {
    reactionBody: req.body.reactionBody,
    username: req.body.username,
  };

  thoughts
    .findByIdAndUpdate(
      req.params.id,
      { $addToSet: { reactions: newReaction } },
      { new: true }
    )
    .then((dbThoughtData) => {
      res.json(dbThoughtData);
    })
    .catch((err) => res.json(err.message));
});
// DELETE thought reaction
router.delete("/:id/reactions", (req, res) => {
  thoughts
    .findByIdAndUpdate(
      req.params.id,
      {
        $pull: { reactions: { _id: req.body.reactionId } },
      },
      { new: true }
    )
    .then((dbThoughtData) => {
      res.json(dbThoughtData);
    })
    .catch((err) => res.json(err.message));
});

export default router;
