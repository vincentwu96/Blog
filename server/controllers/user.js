import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from '../models/user.js';

export const signin = async(req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message: "Invalid email"});
        // https://www.npmjs.com/package/bcrypt
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid password"});
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'temp', {expiresIn: "1h"});
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const signup = async(req, res) => {
    const {firstName, lastName, email, password, confirmPassword} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "This email has already been used"});
        if(password !== confirmPassword) return res.status(400).json({message: "Passwords do not match"});
        // auto-gen hash and salt
        const hash = await bcrypt.hash(password, 12);
        const result = await User.create({email, password: hash, name: `${firstName} ${lastName}`});
        const token = jwt.sign({email: result.email, id: result._id}, 'temp', {expiresIn: "1h"});
        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
}