const Project = require('../models/Project');

// Create a new project
const createProject = async (req, res) => {
    try {
        const { title, description, members } = req.body;

        const project = await Project.create({
            title,
            description,
            owner: req.user._id || req.user.id,
            members: members || []
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all projects for logged-in user
const getProjects = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const projects = await Project.find({
            $or: [{ owner: userId }, { members: userId }]
        })
            .populate('owner', 'name email')
            .populate('members', 'name email');

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProject, getProjects };