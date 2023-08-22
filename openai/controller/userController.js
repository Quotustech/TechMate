const User = require('../model/userModel')


const createUser = async (req, res) =>{
    try{
        const { name, email, role,  password } = req.body;
        const newUser = new User({ name, email, password , role});
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
        
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });

    }
};

module.exports = {
    createUser
}