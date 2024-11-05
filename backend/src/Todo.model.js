import mongoose, { Schema } from "mongoose";

const TodoSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    subTodo: [
        {
            title: {
                type: String,
            },
            completed: {
                type: Boolean,
                default: false
            }
        }
    ]
});

export const Todo = mongoose.model("Todo", TodoSchema);
