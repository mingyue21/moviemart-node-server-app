import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
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
    }
    catch (err) {
        res.send({
            success: false,
            message: err.message,
        })
    }
});

export default router;