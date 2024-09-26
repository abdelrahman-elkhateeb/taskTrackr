import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Project title is required"],
  },
  description: {
    type: String,
    required: [true, "Project description is required"],
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "manager", "contributor", "viewer"], 
      required: true,
    }
  }],
  missions: [{
    title: {
      type: String,
      required: [true, "Mission title is required"],
    },
    description: {
      type: String,
      required: [true, "Mission description is required"],
    },
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    }
  }], 
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;

