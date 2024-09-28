import mongoose from "mongoose";

const dailyLogSchema = new mongoose.Schema({
    materialType: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
});

const infoSchema = new mongoose.Schema({
    projectName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dailyLogs: [dailyLogSchema], 
  });

const projectSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    projects: [infoSchema]
})

const Project = mongoose.models.projects || mongoose.model("projects", projectSchema);

export default Project;