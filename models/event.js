const { builtinModules } = require('module');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    category: {type: String, required: [true, "category is required"], enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']},
    title: {type: String, required: [true, "title is required"]},
    hostName: {type: Schema.Types.ObjectId, ref: 'User'},


},
{timestamps: true}
);

//collection name is events in the database
module.exports = mongoose.model('Event', eventSchema);


