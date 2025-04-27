import express from 'express'
import catchAsync from '../utils/catchAsync.js'
import {
    getIssues,
    getIssue,
    updateIssue,
    deleteIssue,
    getUsers,
    getUser,
    suspendUser,
} from '../controllers/admin.controller.js'

const router = express.Router()

router.get('/issues', catchAsync(getIssues))
router
    .route('/issues/:id')
    .get(catchAsync(getIssue))
    .put(catchAsync(updateIssue))
    .delete(catchAsync(deleteIssue))

router.get('/users', catchAsync(getUsers))
router.route('/users/:id').get(catchAsync(getUser)).put(catchAsync(suspendUser))

export default router
