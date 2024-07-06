const TimeLog = require('../models/timeLog');

exports.getDailyReport = async (req, res) => {
  const { date } = req.query;

  try {
    const logs = await TimeLog.find({ date });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
