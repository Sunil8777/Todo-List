import mongoose,{Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    refreshToken:{
        type: String
    }
},{timestamps: true})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hash(this.password, 10);
    }
    next();  
});


userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            email: this.email,
            _id: this._id
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '1h'
        }
    )
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            email: this.email,
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '10d'
        }
    )
}

export const User = mongoose.model("User",userSchema);

