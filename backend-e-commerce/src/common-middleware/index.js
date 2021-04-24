const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.requireSignin = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(511).json({ message: "Authorization required" });
    else {
        const token = req.headers.authorization.split(" ")[1];
        try {
            console.log('cookie', req.cookies, req.signedCookies);
            const user = jwt.verify(token, process.env.JWT_SECRET);
            if (user) {
                // if (req.ip !== user.ip) return res.status(511).json({ message: 'Access denied' });
                const _user = await User.findById(user._id);
                if (_user && _user.isSignedIn && _user.reftoken) {
                    jwt.verify(_user.reftoken, token, (error, ref) => {
                        if (error || (ref && ref.token !== token)) {
                            _user.isSignedIn = false;
                            _user.save((err, data) => {
                                if (err) return res.status(511).json(err);
                                return res.status(511).json({ error, message: 'Someone has tried to access your account, please change your password' });
                            });
                        }
                        else {
                            req.user = user;
                            return next();
                        }
                    });
                }
                else {
                    return res.status(511).json({ message: "Token expired" });
                }
            }
            else {
                return res.status(511).json({ message: "Your Token expired" });
            }
        }
        catch (error) {
            return res.status(511).json({ error, message: 'Something went wrong' });
        }
    }
}

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(511).json({
            message: 'User Access denied'
        });
    }
    next();
}

exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(511).json({
            message: 'Admin Access denied'
        });
    }
    next();
}