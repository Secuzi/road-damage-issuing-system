import express from 'express'
import catchAsync from '../utils/catchAsync'
import {
    getIssues,
    getIssue,
    updateIssue,
    deleteIssue,
} from '../controllers/admin/issue.admin.js'
import {
    getUsers,
    getUser,
    suspendUser,
} from '../controllers/admin/user.admin.js'

const router = express.Router()

router.post('/issues', catchAsync(getIssues))
router
    .route('/issues/:id')
    .get(catchAsync(getIssue))
    .put(catchAsync(updateIssue))
    .delete(catchAsync(deleteIssue))

router.get('/users', catchAsync(getUsers))
router.route('/users/:id').get(catchAsync(getUser)).put(catchAsync(suspendUser))

export default router
