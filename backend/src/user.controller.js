import {User} from './user.model.js'

const genrateAccessAndRefresh = async (user) =>{
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    if(!accessToken || !refreshToken){
        return res.status(500).json("not able to genrate Token")
    }    

    await User.findByIdAndUpdate(user?._id,
        {
            $set:{
                refreshToken
            }
        }
    )
    return {accessToken,refreshToken}
}

const SignUp = async (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({invalid:true,message:"Invalid email and password required"})
    }

    const isUserAvailable = await User.findOne({email});

    if(isUserAvailable){
        return res.status(400).json({invalid:true,message:"User already exist"});
    }

    await User.create({
        email,
        password,
    })

    return res.status(200).json({invalid:false,message:"User created successfully"});
}

const logIn = async (req,res)=>{

    const {email,password} = req.body;

    if(!email ||!password){
        return res.status(400).json({invalid:true,message:"email and password both are required "});
    }

    const user = await User.findOne({email});
    
    if(!user){
        return res.status(404).json({invalid:true,message:"user not found"})
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    
    if(!isPasswordValid){
        return res.status(400).json({invalid:true,message:"email or password is incorrect"})
    }

    const {accessToken,refreshToken} = await genrateAccessAndRefresh(user);
    const logInUser = await User.findById(user._id).select("-password -refreshToken");

    const options ={
        httpOnly: true,
        secure: true,
    }

    console.log(accessToken);

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json({
        message:"User has been log in successfully",
        loginAccess:true
    });
    
}

const logout = async (req,res)=>{
    console.log(req.user);
    await User.findByIdAndUpdate(req.user?._id,
        {
            $set:{
                refreshToken: undefined
            }
        }
    )

    const options ={
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json({
        message: "user is successfully logout",
        logout: "true"
    })
}
export {logIn,SignUp,logout}