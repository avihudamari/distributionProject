const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        phoneNumber:{
            type: String,
            //required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
        },
        isConnected: {
            type: Boolean
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema)