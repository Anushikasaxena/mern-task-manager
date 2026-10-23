const Task = require('../models/Task');
const Project = require('../models/Project');

// Create a task inside a project
const createTask = async (req, res) => {
    try {
        const { title, description, projectId, assignedTo, priority, dueDate } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const task = await Task.create({
            title,
            description,
            project: projectId,
            assignedTo,
            priority,
            dueDate
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all tasks for a specific project
const getProjectTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId }).populate('assignedTo', 'name email');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update task status (To Do -> In Progress -> Done)
const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.status = status || task.status;
        const updatedTask = await task.save();

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTask, getProjectTasks, updateTaskStatus };