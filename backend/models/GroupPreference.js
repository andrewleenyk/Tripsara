const mongoose = require('mongoose');

const groupPreferenceSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    preference_values: {
        type: String,
        required: true,
        maxlength: 250
    },
    destination: {
        type: String,
        required: true,
        maxlength: 100
    },
});

module.exports = mongoose.model('GroupPreference', groupPreferenceSchema);
