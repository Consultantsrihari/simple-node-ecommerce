module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
    }
    // User is logged in, proceed to the next middleware or route handler
    next();
}
