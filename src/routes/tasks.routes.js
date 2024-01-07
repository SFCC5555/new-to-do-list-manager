const express = require("express");
const authRequired = require("../middlewares/validateToken");
const {
  getTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasks.controller");

const router = express.Router(); // Create an instance of an Express router

router.get("/tasks", authRequired, getTasks);
router.post("/tasks", authRequired, createTask);
router.get("/tasks/:id", authRequired, getTask);
router.put("/tasks/:id", authRequired, updateTask);
router.delete("/tasks/:id", authRequired, deleteTask);

module.exports = router;
