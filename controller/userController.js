import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message:'User does not exist'});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({message:'Invalid Credentials'});

        const token = jwt.sign({email:existingUser.email, id:existingUser._id},'testxyz', {expiresIn:'1h'})
         res.status(200).json({result:existingUser, token})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }

}

export const signup = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;
    console.log('dssfdsfsdfdsfsd', req.body)
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message:'User already exists'});

        if(password != confirmPassword) return res.status(400).json({message:'Password dont match'});
        
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({email, password:hashedPassword, name:`${firstName} ${lastName}`});
        const token = jwt.sign({email:result.email, id:result._id},'testxyz', {expiresIn:'1h'})
       res.status(200).json({result, token})
        


    } catch (error) {
        console.log('sdsfdsfssfserrr', error)
        res.status(500).json({message:error});
    }


}