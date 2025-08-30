import express from 'express'
import { authenticate } from '../utils/utility.js'
import upload from '../middleware/uploadmiddleware.js'
import { addAbout, addCertificates, addDetails, addProject, addSkill, allSkills, deleteCertificate, deleteCourseItem, deletePassionateItem, deleteProject, deleteSkill, deleteSummaryItem, getAbout, getCertificates, getDetails, getProjects, getSpecificSkillCategory, updateAbout, updateDetails, updateProblemSolving } from '../controllers/detailsController.js'
const detailsRouter = express.Router()

detailsRouter.post('/add', authenticate, upload.single('image'), addDetails) //Get req completed
detailsRouter.put('/update', authenticate, upload.single('image'), updateDetails)
detailsRouter.get('/get-personal-details', getDetails)
detailsRouter.put('/update-details-passionate/:id', authenticate, deletePassionateItem)

detailsRouter.post('/add-skill', authenticate, addSkill ) //Get req completed
detailsRouter.get('/get-all-skills', allSkills) 
detailsRouter.get('/get-specific-skill-category', getSpecificSkillCategory)
detailsRouter.delete('/delete-skill/:id', authenticate, deleteSkill)

detailsRouter.post('/add-project', authenticate, upload.single('image'), addProject) // Get req completed
detailsRouter.get('/get-all-projects', getProjects)
detailsRouter.delete('/delete-project/:id', authenticate, deleteProject)

detailsRouter.post('/add-certificate', authenticate, upload.single('image'), addCertificates) // Get req completed
detailsRouter.get('/get-all-certificates', getCertificates)
detailsRouter.delete('/delete-certificate/:id', authenticate, deleteCertificate)

// Add About
detailsRouter.post('/add-about', authenticate, addAbout) // Get req completed
detailsRouter.put('/update-about/:id', authenticate, updateAbout)
detailsRouter.get('/get-about', getAbout)
detailsRouter.put('/update-about-summary/:id', authenticate, deleteSummaryItem)
detailsRouter.put('/update-about-course/:id', authenticate, deleteCourseItem)
detailsRouter.put('/update-problem-solving/:id', authenticate, updateProblemSolving)
export default detailsRouter