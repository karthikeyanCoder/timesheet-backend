const Employee = require('../models/employee');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { employeeID, name, team, role, password } = req.body;
  try {
    const employee = new Employee({ employeeID, name, team, role, password });
    await employee.save();
    res.status(201).json({ message: 'Employee registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { employeeID, password } = req.body;
  try {
    const employee = await Employee.findOne({ employeeID });
    if (!employee || !(await employee.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: employee._id, role: employee.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.json({ token,role: employee.role, name: employee.name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
