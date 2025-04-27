import express from 'express'
import catchAsync from '../utils/catchAsync.js'
import {
    getIssues,
    getIssue,
    createIssue,
    updateIssue,
    deleteIssue,
} from '../controllers/user.controller.js'

const router = express.Router()

router.route('/issues').get(catchAsync(getIssues)).post(catchAsync(createIssue))
router
    .route('/issues/:id')
    .get(catchAsync(getIssue))
    .put(catchAsync(updateIssue))
    .delete(catchAsync(deleteIssue))

export default router
