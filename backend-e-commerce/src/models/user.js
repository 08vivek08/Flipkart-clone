const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        trim: true,
        min: 3,
        max: 20
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {
        type: String
    },
    profilePictue: {
        type: String
    },
    isSignedIn: {
        type: Boolean,
        default: false
    },
    reftoken: {
        type: String,
        default: null
    }
}, { timestamps: true });

// userSchema.virtual('password')
//     .set(function (password) {
//         this.hash_password = bcrypt.hashSync(password, 13);
//     });

userSchema.virtual('fullName')
    .get(function () {
        if (!this.lastName) return `${this.firstName}`;
        else return `${this.firstName} ${this.lastName}`;
    });

userSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.hash_password);
    }
}


module.exports = mongoose.model('User', userSchema);