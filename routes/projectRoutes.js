import express from "express";
import verifyToken from "../middlewares/verifyToken.js"
import { protect } from "../middlewares/authMiddleware.js";
import {
  createProject,
  getProjects,getSingleProject,fundProject,deleteProject,updateProject,addProjectUpdate,getProjectUpdates,
   getProjectComments,
  addProjectComment,
  updateProjectComment,
  deleteProjectComment
} from "../controllers/projectController.js";
const router = express.Router();
// get all projects (homepage)
router.get("/", getProjects);
// create project
router.post("/create", protect, createProject);
router.get("/:id", getSingleProject);
router.post("/fund/:id", protect, fundProject);
router.delete("/:id", protect, deleteProject);
router.put("/:id", protect, updateProject);
// creator adds update
router.post("/:id/updates", verifyToken, addProjectUpdate);
// all users see updates
router.get("/:id/updates", getProjectUpdates);
//router.get("/my", verifyToken, getMyProjects);
// COMMENTS
// router.get("/:id", getSingleProject);
// COMMENTS
router.get("/:id/comments", getProjectComments);
router.post("/:id/comments", verifyToken, addProjectComment);
router.put("/comments/:commentId", verifyToken, updateProjectComment);
router.delete("/comments/:commentId", verifyToken, deleteProjectComment);
export default router;