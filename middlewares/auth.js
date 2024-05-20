// Middlewares for role checking
function isAuthenticated(req, res, next) {
    // Dummy check for authentication, replace with actual logic
    if (req.user) {
      next();
    } else {
      res.status(401).send('You need to log in first.');
    }
  }
  
  function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).send('Access denied. Admins only.');
    }
  }
  
  function isMahasiswa(req, res, next) {
    if (req.user && req.user.role === 'mahasiswa') {
      next();
    } else {
      res.status(403).send('Access denied. Mahasiswa only.');
    }
  }
  
  module.exports = {
    isAuthenticated,
    isAdmin,
    isMahasiswa
  };
  