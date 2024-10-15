import express from 'express';
import {
  assignRole,
  updateRole,
  removeMember,
  getProjectMembers,
  createProject,
  deleteProject,
  getUserProjects,
  addMissionToProject,
  getProjectById,
  updateMissionState,
  getAllMissions,
  getUserMissions,
  deleteMissionFromProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.post('/create', createProject);                             // ✅

router.get('/user/:userId/projects', getUserProjects);             // ✅

router.delete('/:projectId/:userId', deleteProject);               // ✅

router.get('/:projectId', getProjectById);                         // ✅

router.get('/:projectId/members/:userId', getProjectMembers);      // ✅

router.post('/assign-role', assignRole);                           // ✅   add member to project

router.put('/update-role', updateRole);                            // ✅

router.delete('/remove-member', removeMember);                     // ✅

router.post('/addMission', addMissionToProject);                   // ✅

router.put('/updateMissionState', updateMissionState);

// router.get('/allMissions/:projectId', getAllMissions);

// router.get('/userMissions/:projectId/:userId', getUserMissions);

router.delete('/del-mission', deleteMissionFromProject);           // ✅ 


export default router;