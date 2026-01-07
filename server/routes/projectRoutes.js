import express from 'express';
import { createProject, updateProject, addMember } from '../controllers/projectController.js';

const projectRouter = express.Router();

// Project routes - all protected with authentication
projectRouter.post('/create', createProject);
projectRouter.put('/update', updateProject);
projectRouter.post('/:projectId/addMember', addMember);

export default projectRouter;