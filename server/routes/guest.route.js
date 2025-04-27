import express from 'express'
import catchAsync from '../utils/catchAsync.js'
import {getIssues, getIssue} from '../controllers/guest.controller.js'

const router = express.Router()

router.get('/issues', catchAsync(getIssues))
router.get('/issues/:id', catchAsync(getIssue))

export default router
