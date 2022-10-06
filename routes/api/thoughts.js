import express from "express";
import mongoose from "mongoose";
const router = express.Router();

import ThoughtSchema from "../../models/Thought.js";

const thoughts = mongoose.model("Thought", ThoughtSchema);

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
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.error(err), res.json(err);
    });
});
// POST new thought
router.post("/", (req, res) => {});
// PUT thought by id
router.put("/:id", (req, res) => {});
// DELETE thought by id
router.delete("/:id", (req, res) => {});
// POST new thought reaction
router.post("/:id/reactions", (req, res) => {});
// DELETE thought reaction
router.delete("/:id/reactions", (req, res) => {});

export default router;
