import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
const router = Router();

// register
router.post('/register', async (req, res) => {
    try {
        // check if user already exists
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.send({
                success: false,
                message: 'User already exists',
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        // create user
        const newUser = await User(req.body);
        await newUser.save();

        res.send({
            success: true,
            message: 'User created successfully',
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        })
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        // check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: 'User does not exist',
            });
        }

        // check if password is correct
        const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCorrect) {
            return res.send({
                success: false,
                message: 'Invalid password',
            });
        }

        // create and assign token
        const secretKey = 'moviemart';
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        // login successfully
        res.send({ 
            success: true, 
            message: 'Login successfully' ,
            data: token
        });

    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        })
    }
});

export default router;