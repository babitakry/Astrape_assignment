import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) 
            return res.status(400).json({ 
                    message: 'User already exists' 
            });

        const hashedPassword = await bcrypt.hash(password, 10); // install bcrypt
        console.log("Hashed password: ", hashedPassword);

        user = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await user.save();

        const payload = { 
            id: user._id 
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });

    } catch (error) {
        console.log(error)
        res.status(500).json({ 
            message: 'Server error' 
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) 
            return res.status(400).json({ 
                    message: 'Invalid credentials' 
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
            return res.status(400).json({ 
                message: 'Invalid credentials' 
            });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ 
            message: 'Server error'
        });
    }
};
