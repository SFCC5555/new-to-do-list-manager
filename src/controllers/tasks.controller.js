const Task = require("../models/task.model");

// getTasks controller

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate("user", "username email");
    res.status(200).json(tasks);
  } catch (error) {
    // Hide production errors details
    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message;
    res.status(500).json({
      message: "Failed to get the tasks",
      error: errorMessage,
    });
  }
};

// createTasks controller

const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });

    await newTask.save();

    const savedTask = await Task.findById(newTask._id).populate(
      "user",
      "username email"
    );

    res
      .status(201)
      .json({ message: "New task successfully created", task: savedTask });
  } catch (error) {
    // Hide production errors details
    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message;
    res.status(500).json({
      message: "Failed to create a new task",
      error: errorMessage,
    });
  }
};

// getTask controller

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("user", "username email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    // Hide production errors details
    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message;
    res.status(500).json({
      message: "Failed to get the task",
      error: errorMessage,
    });
  }
};

// updateTasks controller

const updateTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, date }
      //{ new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await Task.findById(req.params.id).populate(
      "user",
      "username email"
    );

    res
      .status(200)
      .json({ message: "New task successfully updated", task: updatedTask });
  } catch (error) {
    // Hide production errors details
    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message;
    res.status(500).json({
      message: "Failed to update the task",
      error: errorMessage,
    });
  }
};

// deleteTasks controller

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    // Hide production errors details
    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message;
    res.status(500).json({
      message: "Failed to delete the task",
      error: errorMessage,
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
