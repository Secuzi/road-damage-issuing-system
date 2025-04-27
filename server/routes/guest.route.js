import express from 'express'
import catchAsync from '../utils/catchAsync'
import {getIssues} from '../controllers/guest.controller.js'

const router = express.Router()

router.get('/issues', catchAsync(getIssues))

export default router
