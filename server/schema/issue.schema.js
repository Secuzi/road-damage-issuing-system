import mongoose from 'mongoose'

// Issue: {issueID, user._id, description, image, approvalStatus}

const issueSchema = new mongoose.Schema({
    issueID: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    approvalStatus: {
        type: String,
        required: true,
    },
})

export default issueSchema
