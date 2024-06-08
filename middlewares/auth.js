function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
      return next();
  } else {
      return res.redirect('/auth/login');
  }
}

function isAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
      return next();
  } else {
      return res.status(403).send('Access denied. Admins only.');
  }
}

function isMahasiswa(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'mahasiswa') {
      return next();
  } else {
      return res.status(403).send('Access denied. Mahasiswa only.');
  }
}

module.exports = {
  isAuthenticated,
  isAdmin,
  isMahasiswa,
};
