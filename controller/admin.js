const { isAdmin } = require('../middlewares/auth');

function renderDashboard(req, res) {
    if (req.session.user.role === 'admin') {
        res.render('dasboard'); // Pastikan Anda memiliki file `dashboard.ejs`
    } else {
        res.status(403).send('Access denied. Admins only.');
    }
}



function logout(req, res) {
    // Destroy the session
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
    renderDashboard,
    logout
};
