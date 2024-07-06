
const mongoose = require('mongoose');

const TimeLogSchema = new mongoose.Schema({
  employeeID: { type: mongoose.Schema.Types.String, ref: 'Employee', required: true },
  employeeName: { type: String, required: true }, 
  team: { type: String, required: true }, 
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  totalHours: { type: Number, required: true },
});

module.exports = mongoose.model('TimeLog', TimeLogSchema);
