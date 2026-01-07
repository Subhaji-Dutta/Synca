import express from "express";
import {getUserWorkspaces,addMember,createWorkspace } from "../controllers/workspaceController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const workspaceRouter = express.Router()

workspaceRouter.get("/", requireAuth, getUserWorkspaces)
workspaceRouter.post("/", requireAuth, createWorkspace)
workspaceRouter.post("/add-member", requireAuth, addMember)

export default workspaceRouter