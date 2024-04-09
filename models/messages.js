const { builtinModules } = require('module');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    sender: {type: Schema.Types.ObjectId, ref: 'User'},
    text: {type: String, required: [true, "Text message is required"]},
    date: {
        type: Date,
        default: Date.now, // Set default value to current date and time
        // Optionally, specify a custom format for the date using the `get` method
        get: function(date) {
            return date.toLocaleString(); // Format date using the built-in `toLocaleString` method
            // You can use other date formatting methods here as per your requirement
        }
    }
});

module.exports = mongoose.model('Message', messagesSchema);
