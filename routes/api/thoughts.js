import express from "express";
const router = express.Router();

// GET all thoughts
router.get("/", (req, res) => {});
// GET single thought
router.get("/:id", (req, res) => {});
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

module.exports = router;
