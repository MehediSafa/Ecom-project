const User = require('../models/userSchema.js')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const {verificationEmail,forgetPasswordEmail} = require('../utils/emailSender.js');

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

let registrationController = async (req,res)=>{
    let {fullName, email, password, confirmPassword, terms} = req.body

    let existingUser = await User.findOne({email:email})

    if(existingUser){
        return res.status(400).json({
            success:false,
            message:'email already exists'
        })
    }

    if(!fullName || !email || !password || !confirmPassword || !terms) {
       return res.status(400).json(
           { success:false,
            message:"Pleaes fill all fields" }
        )
    }   
    
    if(!emailPattern.test(email)){
       return res.status(400).json({
            success:false,
            message:"Please enter valid email"
        })
    }
 /**********************password pattern************************** */
//  if (!passwordPattern.test(password)) {
//     return res.status(400).json({
//         success: false,
//         message: "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character"
//     });
// }

   

     if(password !== confirmPassword){
           return res.status(400).json({
            success:false,
            message:"Please enter valid email"
         })
     }

     const hash = bcrypt.hashSync(password,10)

    const user = new User({
        fullName:fullName,
        email:email,
        password:hash,
        terms:terms
    })
    
    user.save()

    let verificationToken = jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role
    },'asdfasdgsdfgh',{
        expiresIn: '7d'
    })

    
    
    verificationEmail(email,verificationToken)

    res.status(201).json({
        success:true,
        message:"registration successfull"
    })
    
}

let loginController = async (req, res) => {

    let { email, password } = req.body

    // Check if email and password were provided first
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        })
    }

    // Check email format
    if (!emailPattern.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please enter valid email"
        })
    }

    // Find user
    let existingUser = await User.findOne({ email: email })

    // Check if user exists
    if (!existingUser) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email"
        })
    }

    // Compare entered password with hashed password
    let passCompare = bcrypt.compareSync(
        password,
        existingUser.password
    )

    if (passCompare)
    {
         let accessToken = jwt.sign({
        _id:existingUser._id,
        email:existingUser.email,
        role:existingUser.role
    },process.env.JWT_VERIFY_SECRET,{
        expiresIn: '30d'
    })
        return res.status(200).json({
            success: true,
            message: "login successful",
            data: {
                _id: existingUser._id,
                fullName: existingUser.fullName,
                role: existingUser.role
            },
            accessToken:accessToken
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "incorrect credential"
        })
    }
}

let verifyEmailController = async (req,res) =>{
    let {token} = req.params

    let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);
    
    await User.findByIdAndUpdate({_id:decoded._id} , {isVerified: true})

    res.status(200).json({
        success:true,
        message: 'Email validated'
    })
}

let forgotPasswordController = async (req,res) =>{
    let {email} = req.body
    let existingUser = await User.findOne({email:email})
    if(!existingUser){
        return res.status(400).json({
            success:false,
            message:"User not Found"
        }) 
    }

    let resetPasswordToken = jwt.sign({
        _id:existingUser._id,
        email:existingUser.email,
    },process.env.JWT_VERIFY_SECRET,{
        expiresIn: '3d'
    })

    forgetPasswordEmail(email,resetPasswordToken)
    res.status(200).json({
        success:false,
        message: 'Please check your Email for Resetting Password'
    })
}


let resetPassword = async (req, res) => {
    let { token } = req.params;
    let { newPassword, confirmPassword } = req.body;

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);
    } catch (error) {
        decoded = null;
    }

    if (decoded) {
        if (newPassword === confirmPassword) {
            const hash = bcrypt.hashSync(newPassword, 10);

            await User.findByIdAndUpdate(
                decoded._id,
                { password: hash }
            );

            return res.status(200).json({
                success: true,
                message: "Password Updated"
            });

        } else if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password not Updated"
            });
        }

    } else if (!decoded) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};




module.exports = {registrationController,loginController,verifyEmailController,forgotPasswordController,resetPassword}