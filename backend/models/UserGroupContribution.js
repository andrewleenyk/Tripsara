const mongoose = require('mongoose');

const userGroupContributionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    contribution_amount: {
        type: Number,
        required: true
    },
    goal_amount: {
        type: Number,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('UserGroupContribution', userGroupContributionSchema);
