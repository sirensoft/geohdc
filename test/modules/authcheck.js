var authCheck = function(req, res, next) {
    if (req.session.logged) {
        next()
    } else {
        res.redirect('/auth')
    }
}
module.exports = authCheck