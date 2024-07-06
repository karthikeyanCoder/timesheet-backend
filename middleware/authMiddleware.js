const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const PATH = req.path;
      if (PATH === "/"|| PATH === "/login" || PATH === "/register" || PATH === "/log" || PATH === "/hr") {
        next();
        return;
      }
      token = req.headers.authorization.split(' ')[1];
      //console.log('Token extracted:', token);
     
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //console.log('Token decoded:', decoded);
      req.user = await Employee.findById(decoded.id).select('-password');
      console.log('Authenticated user:', req.user); 
      next();
    } catch (error) {
      //console.error('Token verification error:', error);
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    //console.error('No token found in headers');
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

exports.isHR = (req, res, next) => {
  if (req.user && req.user.role === 'HR') {
    next();
  } else {
    console.error('Access denied, user is not HR');
    res.status(403).json({ error: 'Access denied' });
  }
};
