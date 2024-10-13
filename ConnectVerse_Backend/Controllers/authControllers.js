const User = require('../models/User');
const {getSignedToken,getRefreshToken,matchPassword} = require('../models/User')

const sendTokenResponse = (user,StatusCode,response)=>{
    const accesstoken  = user.getSignedToken();
    const refreshToken = user.getRefreshToken();
    response.status(StatusCode).json({"success msg": "User succesfully created",accesstoken,refreshToken});
}

exports.signup = async(req,res)=>{
    const {name,email,password} = req.body;
    console.log(req.body);
    try{
        const user = await User.create({
            name,
            email,
            password
        });
        sendTokenResponse(user,200,res);
    }catch(error){
        console.log(error);
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyValue)[0];
            return res.status(400).json({
                error: `${duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)} already exists`
            });
        }
        if (error.name === 'ValidationError') {
            const field = Object.keys(error.errors)[0]; 
            const message = error.errors[field].message;
            console.error(error);
            return res.status(400).json({ error: message });
        }
        // res.status(400).json(error);
        console.error(error);
    }
}

exports.login = async(req,res)=>{
    const {identifier,password} = req.body;
    console.log(req.body);
    if(!identifier || !password){
        return res.status(400).json({message : 'Please provide email/username and password'});
    }

    try{
        // const user = await User.findOne({email}).select('+password');
        const user = await User.findOne({
            $or: [{ email: identifier }, { name: identifier }]
        }).select('+password');
        console.log(user);
        if(!user || !(await user.matchPassword(password))){
            return res.status(401).json({message:"Invalid credentials"});
        }

        sendTokenResponse(user,200,res);

    }catch(error){
        res.status(400).json({
            message : "Error logging in",
        })
        console.error(error);
    }
}

exports.refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token not provided' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        const accessToken = user.getSignedToken();
        res.status(200).json({ success: true, accessToken });
    } catch (error) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
};