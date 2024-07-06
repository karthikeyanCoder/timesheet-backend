const TimeLog = require('../models/timeLog');
const Employee = require('../models/employee');

exports.logTime = async (req, res) => {
  const { employeeID, date, startTime, endTime } = req.body;
  const totalHours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);

  try {
    const employee = await Employee.findOne({ employeeID });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

   

    const timeLog = new TimeLog({
      employeeID,
      employeeName: employee.name,
      team: employee.team,
      date,
      startTime,
      endTime,
      totalHours
    });

    await timeLog.save();
    res.status(201).json({ message: 'Time logged successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
