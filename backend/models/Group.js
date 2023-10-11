const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trip_start_date: {
        type: Date,
        required: true
    },
    trip_end_date: {
        type: Date,
        required: true
    },
    total_cost: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Group', groupSchema);
