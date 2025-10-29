import express from 'express';
import {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
  toggleActiveStatus,
  updateAvailability,
  getTeamStatistics
} from '../controllers/teamMemberController.js';

const router = express.Router();

// Team member CRUD routes
router.post('/', createTeamMember);                          // Create new team member
router.get('/', getAllTeamMembers);                          // Get all team members with filters
router.get('/statistics', getTeamStatistics);                // Get team statistics (must be before /:id)
router.get('/:id', getTeamMemberById);                       // Get single team member
router.put('/:id', updateTeamMember);                        // Update team member
router.delete('/:id', deleteTeamMember);                     // Delete team member (soft/permanent)

// Specialized routes
router.patch('/:id/availability', updateAvailability);       // Update availability only
router.patch('/:id/toggle-active', toggleActiveStatus);      // Toggle active/inactive status

export default router;

/* 
 * Usage in main app.js / server.js:
 * 
 * import teamMemberRoutes from './routes/teamMemberRoutes.js';
 * 
 * app.use('/api/team-members', teamMemberRoutes);
 * 
 * This will create the following endpoints:
 * 
 * POST   /api/team-members                         - Create team member
 *        Body: { sellerId, firstName, lastName, email, mobile, designation, category, experience }
 * 
 * GET    /api/team-members                         - Get all team members
 *        Query params: sellerId (required), availability, designation, isActive, search
 * 
 * GET    /api/team-members/statistics              - Get team statistics
 *        Query params: sellerId (required)
 * 
 * GET    /api/team-members/:id                     - Get specific team member
 *        Query params: sellerId (required)
 * 
 * PUT    /api/team-members/:id                     - Update team member (including isActive)
 *        Body: { sellerId, ...updateFields }
 * 
 * DELETE /api/team-members/:id                     - Delete/deactivate team member
 *        Query params: sellerId (required), permanent (optional: 'true' for permanent delete)
 * 
 * PATCH  /api/team-members/:id/availability        - Update availability only
 *        Body: { sellerId, availability }
 * 
 * PATCH  /api/team-members/:id/toggle-active       - Toggle active/inactive status
 *        Body: { sellerId, isActive }
 */