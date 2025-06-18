// we use this for create user schema

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 45,
        validate: {
            validator: function (v) {
                return /^[A-Za-z\s]+$/.test(v); // only letters and spaces
            },
            message: props => `${props.value} is not a valid name! Only letters allowed.`
        },
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email format.`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: function (v) {
                return /^[A-Za-z0-9!@#$%^&*()_+=-]{6,}$/.test(v);
            },
            message: props => `Password must be at least 6 characters long.`
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AuthUser', userSchema, 'authusers');
