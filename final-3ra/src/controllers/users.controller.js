const mainGet = async (req, res) => {
    res.redirect('/productos')
}

const loginGet = async (req, res) => {
    if (req.user) {
        res.redirect('/productos')
    } else {
        res.render('login')
    }
}

const loginPost = async (req, res) => {
    res.redirect('/productos')
}

const retryLogin = async (req, res) => {
    res.render("login", {
        retryLogin: true
    })
}

const retrySignup = async (req, res) => {
    res.render('login', {
        retrySignup: true
    })
}

const logout = async (req, res) => {
    nameLogout = req.user.username
    req.logout((err) => {
        if (err) {
            res.redirect('/login')
        }
        else
            res.render("logout", {
                nameLogout
            })
    })
}


module.exports = { mainGet, loginGet, loginPost, retryLogin, logout, retrySignup }