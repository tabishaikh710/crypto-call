const Joi = require('joi');
const User = require('../models/User');

const bcrypt = require('bcrypt');
const userDto = require('../Dto/user');


const passwordPattern = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";

const authController = {
    async register(req, res, next) {
        // Validate user input
        const userRegisterSchema = Joi.object({
            username: Joi.string().min(5).max(30).required(),
            name: Joi.string().max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp(passwordPattern)).required(),
            confirmPassword: Joi.ref('password')
        });

        const { error } = userRegisterSchema.validate(req.body);

        // If error in validation, return error via middleware
        if (error) {
            return next(error);
        }

        const { username, name, email, password } = req.body;

        try {
            const emailInUse = await User.exists({ email });
            const usernameInUse = await User.exists({ username });

            if (emailInUse) {
                const error = {
                    status: 409,
                    message: 'Email already registered, use another email'
                };
                return next(error);
            }

            if (usernameInUse) {
                const error = {
                    status: 409,
                    message: 'Username is not available, try another username'
                };
                return next(error);
            }
        } catch (err) {
            return next(err);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user data in DB
        const userToRegister = new User({
            username,
            email,
            name,
            password: hashedPassword
        });

        try {
            const user = await userToRegister.save();
            const  UserDto= new userDto(user);
            return res.status(201).json({ user:UserDto });
        } catch (err) {
            return next(err);
        }
    },
    //login
    async login(req, res, next) {
        // Validate user input
        const userLoginSchema = Joi.object({
            username: Joi.string().min(5).max(30).required(),
            password: Joi.string().pattern(new RegExp(passwordPattern)).required()
        });

        const { error } = userLoginSchema.validate(req.body);

        // If error in validation, return error
        if (error) {
            return next(error);
        }

        const { username, password } = req.body;

        let user;

        try {
            // Match username
            user = await User.findOne({ username: username });
            if (!user) {
                const error = {
                    status: 401, // 401 is for invalid credentials
                    message: 'Invalid username'
                };
                return next(error);
            }

            // Match password
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                const error = {
                    status: 401,
                    message: 'Invalid password'
                };
                return next(error);
            }
        } catch (err) {
            return next(err);
        }

        const  UserDto= new userDto(user);
        return res.status(200).json({ user: UserDto });
    },
};

module.exports = authController;
 