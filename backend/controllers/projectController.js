import mongoose from "mongoose";
import Project from "../models/projectModel.js";
import User from "../models/userModel.js";

export const createProject = async (req, res) => {
  const { title, description, userId } = req.body;

  if (!title || !description || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingProject = await Project.findOne({ title });
    if (existingProject) {
      return res
        .status(409)
        .json({ message: "A project with this title already exists" });
    }

    const newProject = await Project.create({
      title,
      description,
      members: [
        {
          user: user._id,
          role: "owner",
        },
      ],
    });

    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignRole = async (req, res) => {
  const { projectId, userEmail, role } = req.body;

  if (!projectId || !userEmail || !role) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  try {
    const project = await Project.findById(projectId);

    const user = await User.findOne({ email: userEmail });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validRoles = ["manager", "contributor", "viewer"];

    if (!validRoles.includes(role.toLowerCase())) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const isAlreadyMember = project.members.some(
      (member) => member.user.toString() === user._id.toString()
    );

    if (isAlreadyMember) {
      return res
        .status(400)
        .json({ message: "User is already a member of the project" });
    }

    project.members.push({ user: user._id, role: role.toLowerCase() });

    await project.save();

    res.status(200).json({ message: "Role assigned successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  const { projectId, userEmail, newRole } = req.body;

  if (!projectId || !userEmail || !newRole) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  try {
    const project = await Project.findById(projectId);
    const user = await User.findOne({ email: userEmail });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validRoles = ["manager", "contributor", "viewer"];

    if (!validRoles.includes(newRole.toLowerCase())) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const memberIndex = project.members.findIndex(
      (member) => member.user.toString() === user._id.toString()
    );

    if (memberIndex === -1) {
      return res
        .status(404)
        .json({ message: "User is not a member of the project" });
    }

    project.members[memberIndex].role = newRole.toLowerCase();
    await project.save();

    res.status(200).json({ message: "Role updated successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeMember = async (req, res) => {
  const { projectId, userEmail } = req.body;

  if (!projectId || !userEmail) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  try {
    const project = await Project.findById(projectId);
    const user = await User.findOne({ email: userEmail });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const memberIndex = project.members.findIndex(
      (member) => member.user.toString() === user._id.toString()
    );

    if (memberIndex === -1) {
      return res
        .status(404)
        .json({ message: "User is not a member of the project" });
    }

    project.members.splice(memberIndex, 1);
    await project.save();

    res.status(200).json({ message: "Member removed successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectMembers = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate(
      "members.user",
      "name email"
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ members: project.members });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProjects = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const projects = await Project.find({ "members.user": userId }).populate(
      "members.user",
      "name email"
    );

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMissionToProject = async (req, res) => {
  const { projectId, title, description, userId } = req.body;

  if (!projectId || !title || !description || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid project ID format" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const isUserMember = project.members.some(
      (member) => member.user.toString() === userId
    );

    if (!isUserMember) {
      return res
        .status(403)
        .json({ message: "User is not a member of this project" });
    }

    const member = project.members.find(
      (member) => member.user.toString() === userId
    );

    if (!member || !["owner", "manager", "contributor"].includes(member.role)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to add a mission" });
    }

    project.missions.push({
      title,
      description,
      completedBy: userId,
    });

    await project.save();

    res.status(201).json({ message: "Mission added successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
