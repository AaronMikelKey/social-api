import express from "express";
const router = express.Router();

// GET all users
router.get("/", (req, res) => {});
// GET single user, thoughts, and friends
router.get("/:id", (req, res) => {});
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

module.exports = router;
