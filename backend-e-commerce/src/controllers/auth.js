const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const get_ip = require('ipware')().get_ip;

exports.signup = async (req, res) => {
    User.findOne({ email: req.body.email }).
        exec(async (error, user) => {
            if (user) return res.status(400).json({
                message: 'You are already registered'
            });
            if (error) return res.status(400).json({
                error: `controller_user_find: ${error}`
            });
            const {
                firstName,
                lastName,
                email,
                password,
                role
            } = req.body;
            const hash_password = await bcrypt.hash(password, 13);
            const _user = new User({
                firstName,
                lastName,
                email,
                hash_password,
                role,
                userName: email.split('@')[0] + '_' + shortid.generate()
            });
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        error: `controller_user_save: ${error}`
                    });
                }
                if (data) {
                    return res.status(201).json({
                        message: `${req.body.role} created Succesfully...!`,
                        role: _user.role
                    })
                }
            });
        });
}

exports.signin = async (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                bcrypt.compare(req.body.password, user.hash_password, (error, result) => {
                    if (error) res.status(400).json({ error });
                    if (result) {
                        if ((user.role !== req.body.role)) {
                            return res.status(500).json({ message: `You are not an ${req.body.role}` });
                        }
                        const ip_info = req.ip; //get_ip(req);
                        const token = jwt.sign({ _id: user._id, role: user.role, ip: req.ip, alg: 'RS256' }, process.env.JWT_SECRET, { expiresIn: '1d' });
                        const { _id, firstName, lastName, email, role, fullName } = user;
                        let message = `Welcome ${user.firstName}`;
                        if (user.reftoken !== null) {
                            message = 'Someone has tried to access your account, please change your password';
                        }
                        user.isSignedIn = true;
                        const reftoken = jwt.sign({ token: token }, token, { expiresIn: '1d' });
                        user.reftoken = reftoken;
                        user.save((error, data) => {
                            if (error) {
                                return res.status(400).json(error);
                            }
                            res.cookie('token', token, { maxAge: 60 * 60 * 24 * 1000, secure: true, httpOnly: true, path: '/', sameSite: true });
                            return res.status(200).json({
                                token,
                                user: { _id, firstName, lastName, email, role, fullName },
                                message, ip_info
                            });
                        });
                    }
                    else return res.status(400).json({ message: "Your password is incorrect" });
                });
            }
            else return res.status(400).json({ message: 'Email not registered' });
        });
}

exports.signout = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    res.clearCookie('token');
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
        const _user = await User.findById(user._id);
        _user.isSignedIn = false;
        _user.reftoken = null;
        await _user.save();
    }
    return res.status(200).json({
        message: 'Signout successful...'
    });
}