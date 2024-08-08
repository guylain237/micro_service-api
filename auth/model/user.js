const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs'); // Assurez-vous d'avoir installé bcrypt

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email est requis'],
        unique: true,
        validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} n'est pas un email valide !`
        }
    },
    password: {
        type: String,
        required: [true, 'Mot de passe est requis'],
        minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères'],
        select: false,
        validate: {
            validator: function(value) {
                return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(value);
            },
            message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial'
        }
    },
    role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' }
}, {
    timestamps: true,
});

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password") || !this.password) {
            return next();
        }

        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;

        next();
    } catch (error) {
        next(error);
    }
});

userSchema.plugin(uniqueValidator, { message: 'Erreur: {PATH} doit être unique.' });

module.exports = mongoose.model('User', userSchema);
