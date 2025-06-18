// api ke liye

const  User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
const registerUser = async (req,res)=>{
    try{
        const {name , email, password} = req.body;
    
        // check all fields are filled
        if(!name || !email || !password){
            return res.status(400).json({
                message: 'Please fill all fields'
            });
        }
        // check if user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message: 'User already exists'
            });
        }
        // hash password

        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        await user.validate(); // validate the user schema
        await user.save();

        // create token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({
            message: 'User created successfully',
            user,
            token
        });


    }catch(err){
        console.log(err);

        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
          }
        res.status(500).json({
            message: 'Server error'
        });
    }
}



const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
// forgot password
 const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
  
    // For now, just simulate reset
    res.json({
      message: `Password reset link sent to ${email} (feature coming soon)`
    });
  
    // In real-world: generate token, send email with link
  };

  
  module.exports = { registerUser, loginUser,forgotPassword };
