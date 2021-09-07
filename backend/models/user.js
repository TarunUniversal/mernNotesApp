const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//email verification
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SEND_GRID)


const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        },
        isAdmin:{
            type: Boolean,
            required: true,
            default: false,
        },
        pic:{
            type: String,
            required: true,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        emailToken:{
            type: String,
        },
        isVerified:{
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

// // this will encrypt password everytime when its saved
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);
module.exports = User;