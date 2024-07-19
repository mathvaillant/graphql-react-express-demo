const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  status: {
    type: String,
    enum: ["OPEN", "IN_PROGRESS", "COMPLETED"],
    default: 'active'
  },
  clientId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: true
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
