const express = require("express");
const router = express.Router();
const { create, getAll, getById, updateStatus, remove } = require("../controllers/quotationController");
const { protect, adminOnly } = require("../middleware/auth");

// Public route (Frontend form submission)
router.post("/", create);

// Admin protected routes
router.get("/", protect, adminOnly, getAll);
router.get("/:id", protect, adminOnly, getById);
router.patch("/:id/status", protect, adminOnly, updateStatus);
router.delete("/:id", protect, adminOnly, remove);

module.exports = router;
