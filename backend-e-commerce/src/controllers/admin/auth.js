const jwt = require("jsonwebtoken");
const User = require("../../models/user");

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).
        exec((error, user) => {
            if (user) return res.status(400).json({
                message: 'Admin already registered'
            });
            if (error) return res.status(400).json({
                error: `controller_admin_find: ${error}`
            });

            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;

            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                userName: Math.random().toString(),
                role: 'admin'
            });
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        error: `controller_admin_save: ${error}`
                    });
                }
                if (data) {
                    return res.status(201).json({
                        message: 'Admin created Succesfully...!',
                        role: _user.role
                    })
                }
            });

        });
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                if (user.authenticate(req.body.password) && user.role==='admin') {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.status(200).json({
                        token,
                        user: { _id, firstName, lastName, email, role, fullName }
                    });
                }
                else {
                    return res.status(400).json({ message: "Your password is incorrect" });
                }
            }
            else {
                return res.status(400).json({message: 'Something fishy'});
            }
        });
}
