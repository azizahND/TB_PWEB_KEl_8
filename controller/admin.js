const { jawabanEvaluasi, mahasiswa, pertanyaan } = require('../models');

async function getDashboard(req, res, next) {
  await jawabanEvaluasi.findAll({
    include: [
      { model: mahasiswa, as: 'mahasiswa' },
      { model: pertanyaan, as: 'pertanyaan' }
    ]
  })
  .then(dataEvaluasi => {
    res.render('dasboard', { dataEvaluasi });// Sending JSON response with dataEvaluasi
  })
  .catch(error => {
    next(error); // Passing the error to error handling middleware
  });
}


function renderDashboard(req, res) {
  if (req.session.user && req.session.user.role === 'admin') {
    res.render('dasboard'); // Pastikan Anda memiliki file `dashboard.ejs`
  } else {
    res.status(403).send('Access denied. Admins only.');
  }
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error ketika logout:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    // Redirect to the login page
    return res.redirect('/login');
  });
}

module.exports = {
  getDashboard,
  renderDashboard,
  logout
};
