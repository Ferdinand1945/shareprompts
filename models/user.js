import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exist!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^[A-Za-z0-9.-]{3,30}$/, "User must contain 3-30 alphanumeric letters, dots, or dashes!"],
    },
    image: {
        type: String,
    }
}); 
const User = models.User || model("User", UserSchema)

export default User;