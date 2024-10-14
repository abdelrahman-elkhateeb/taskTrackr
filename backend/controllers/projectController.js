import mongoose from "mongoose";
import { Project } from "../models/projectModel.js";
import User from "../models/userModel.js";

export const createProject = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  if (!title || !description) {
    return res.status(400).json({ success: false, message: "Please fill in all fields" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingProject = await Project.findOne({
      title,
      "members.user": user._id,
      "members.role": "owner",
    });

    if (existingProject) {
      return res.status(409).json({ message: "A project with this title already exists for this user" });
    }

    const newProject = await Project.create({
      title,
      description,
      members: [{ user: user._id, role: "owner" }],
    });

    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignRole = async (req, res) => {
  const { projectId, userEmail, role } = req.body;
  const userId = req.user.id; 

  if (!projectId || !userEmail || !role) {
    return res.status(400).json({ success: false, message: "Please fill in all fields" });
  }

  const normalizedRole = role.toLowerCase();
  const validRoles = ["manager", "contributor", "viewer"];

  if (!validRoles.includes(normalizedRole)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const requester = project.members.find(member => member.user.toString() === userId);
    if (!requester || !["owner", "manager"].includes(requester.role)) {
      return res.status(403).json({ message: "Unauthorized to assign roles" });
    }

    const existingMember = project.members.find(
      (member) => member.user.toString() === user._id.toString()
    );

    if (existingMember) {
      if (existingMember.role === normalizedRole) {
        return res.status(400).json({ message: "User is already a member with the same role" });
      }
      existingMember.role = normalizedRole;
    } else {
      project.members.push({ user: user._id, role: normalizedRole });
    }

    await project.save();

    res.status(200).json({ message: "Role assigned successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  const { projectId, userEmail, newRole } = req.body;
  const userId = req.user.id; 

  if (!projectId || !userEmail || !newRole) {
    return res.status(400).json({ success: false, message: "Please fill all fields" });
  }

  const normalizedRole = newRole.toLowerCase();
  const validRoles = ["manager", "contributor", "viewer"];

  if (!validRoles.includes(normalizedRole)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const requester = project.members.find(member => member.user.toString() === userId);
    if (!requester || !["owner", "manager"].includes(requester.role)) {
      return res.status(403).json({ message: "Unauthorized to update roles" });
    }

    const memberIndex = project.members.findIndex(
      (member) => member.user.toString() === user._id.toString()
    );

    if (memberIndex === -1) {
      return res.status(404).json({ message: "User is not a member of the project" });
    }

    if (project.members[memberIndex].role === normalizedRole) {
      return res.status(400).json({ message: "User already has this role" });
    }

    project.members[memberIndex].role = normalizedRole;

    await project.save();

    res.status(200).json({ message: "Role updated successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeMember = async (req, res) => {
  const { projectId, userEmail } = req.body;
  const userId = req.user.id; 

  if (!projectId || !userEmail) {
    return res.status(400).json({ success: false, message: "Please fill in all fields" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const requester = project.members.find(member => member.user.toString() === userId);
    if (!requester || !["owner", "manager"].includes(requester.role)) {
      return res.status(403).json({ message: "Unauthorized to remove members" });
    }

    const memberIndex = project.members.findIndex(
      (member) => member.user.toString() === user._id.toString()
    );

    if (memberIndex === -1) {
      return res.status(404).json({ success: false, message: "User is not a member of the project" });
    }

    if (project.members[memberIndex].role === "owner") {
      return res.status(403).json({ success: false, message: "Cannot remove the project owner" });
    }

    project.members.splice(memberIndex, 1);
    await project.save();

    res.status(200).json({ success: true, message: "Member removed successfully", project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectMembers = async (req, res) => {
  const { projectId, userId } = req.params; 

  if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: "Invalid project ID or user ID format" });
  }

  try {
    const project = await Project.findById(projectId).populate(
      "members.user",
      "name email"
    );

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    const user = project.members.find(member => member.user.toString() === userId);
    if (!user || !["owner", "manager"].includes(user.role)) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    res.status(200).json({ success: true, members: project.members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const { projectId, userId } = req.params; 

  if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: "Invalid project ID or user ID format" });
  }

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    const member = project.members.find(member => member.user.toString() === userId);
    if (!member || member.role !== 'owner') {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    await Project.findByIdAndDelete(projectId);
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserProjects = async (req, res) => {
  const { userId } = req.params; 

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: "Invalid user ID format" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const projects = await Project.find({ "members.user": userId }).populate(
      "members.user",
      "name email"
    );

    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addMissionToProject = async (req, res) => {
  const { projectId, title, description, userId } = req.body; // userId should still come from the request body
  
  if (!projectId || !title || !description || !userId) {
    return res.status(400).json({ success: false, message: "Please fill in all fields" });
  }

  if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: "Invalid project ID or user ID format" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    const member = project.members.find(member => member.user.toString() === userId);
    if (!member) {
      return res.status(403).json({ success: false, message: "User is not a member of this project" });
    }

    if (!["owner", "manager"].includes(member.role)) {
      return res.status(403).json({ success: false, message: "You do not have permission to add a mission" });
    }

    project.missions.push({ title, description, completedBy: userId });
    await project.save();

    res.status(201).json({ success: true, message: "Mission added successfully", project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
