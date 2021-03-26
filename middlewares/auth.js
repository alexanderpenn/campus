const isAuthenticated = (req, res, next) => {
    if (req.session.username && req.session.password) {
      next()
    } else {
      next(new Error('User not present within session token.'))
    }
}

module.exports = isAuthenticated