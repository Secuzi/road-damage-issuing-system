import mongoose from 'mongoose'
import issueSchema from '../schema/issue.schema.js'

const Issue = mongoose.model('Issue', issueSchema)

export default Issue
