const express = require("express");
const router = express.Router();
const { getAll, getById, getBySlug, create, update, remove } = require("../controllers/portfolioController");
const { protect, adminOnly } = require("../middleware/auth");

// Public routes
router.get("/", getAll);
router.get("/slug/:slug", getBySlug);
router.get("/:id", getById);

// Admin protected routes
router.post("/", protect, adminOnly, create);
router.put("/:id", protect, adminOnly, update);
router.delete("/:id", protect, adminOnly, remove);

module.exports = router;
