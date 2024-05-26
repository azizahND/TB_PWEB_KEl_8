// Middleware for role checking using session
function isAuthenticated(req, res, next) {
  // Check if user is authenticated
  if (req.session && req.session.user) {
      next();
  } else {
      res.status(401).send('You need to log in first.');
  }
}

function isAdmin(req, res, next) {
  // Check if user is authenticated and has admin role
  if (req.session && req.session.user && req.session.user.role === 'admin') {
      next();
  } else {
      res.status(403).send('Access denied. Admins only.');
  }
}

function isMahasiswa(req, res, next) {
  // Check if user is authenticated and has mahasiswa role
  if (req.session && req.session.user && req.session.user.role === 'mahasiswa') {
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
