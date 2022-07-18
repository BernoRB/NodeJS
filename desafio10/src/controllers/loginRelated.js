const sessionChecker = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/dash')
    } else {
        next()
    }
}

const login = (req, res) => {
    res.render('login', {
        loggedIn: false
    })
}

const loginPost = async (req, res)=>{
    const {username} = req.body
    if (username) {
        req.session.user = username
        res.redirect('/dash')
    } else {
        res.redirect('/login')
    }
}

const logout = (req, res) => {
    if (req.session.user != undefined) { // quiza cuando clickee, ya caducó por maxAge
        const username = req.session.user
        req.session.destroy(() => {
            res.render("logout", {
                nameLogout: username,
                loggedIn: false
            })
        })
    } else {
        res.redirect('/login'); 
    }
}

const dash = (req, res) => {
    if(req.session.user && req.cookies.user_sid){
        res.render("dash", {
            userName: req.session.user,
            loggedIn: true
        })
    }else{
        res.redirect('/login');
    }
}

module.exports = { login, loginPost, logout, dash, sessionChecker }