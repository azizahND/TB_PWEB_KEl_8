function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    // Periksa juga waktu kadaluarsa sesi
    if (req.session.cookie.expires > Date.now()) {
      req.session.cookie.expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // Perpanjang waktu kadaluarsa sesi
      return next();
    } else {
      req.session.destroy(); // Hapus sesi jika telah kadaluarsa
      return res.redirect('/login');
    }
  } else {
    return res.redirect('/login');
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
