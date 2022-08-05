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

const myAccount = async (req, res) => {
    if (req.user) {
        res.render('account', {
            username : req.user.username,
            email : req.user.email,
            name : req.user.name,
            avatar: `../../images/${req.user.avatar}`,
            address: req.user.address,
            age: req.user.age,
            phone: req.user.phone

        })
    } else {
        res.render('login')
    }
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

module.exports = { mainGet, loginGet, loginPost, retryLogin, logout, myAccount, retrySignup }