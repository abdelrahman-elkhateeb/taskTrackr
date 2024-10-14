import express from 'express';
import {
  assignRole,
  updateRole,
  removeMember,
  getProjectMembers,
  createProject,
  deleteProject,
  getUserProjects,
  addMissionToProject
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/:projectId/members', getProjectMembers);

router.get('/user/:userId/projects', getUserProjects);

router.post('/create', createProject);

router.post('/assign-role', assignRole);

router.post('/:projectId/missions', addMissionToProject);

router.put('/update-role', updateRole);

router.delete('/remove-member', removeMember);

router.delete('/:projectId', deleteProject);

export default router;