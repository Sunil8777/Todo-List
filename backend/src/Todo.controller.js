import { Todo } from "./Todo.model.js"
import { User } from "./user.model.js";

const TodoListCreate = async (req,res) =>{
    const email = req.body.email;
    
    try {
        const user = await User.findOne({ email });
        Todo.create({
            user:user._id
        })
    } catch (error) {
        return res.status(201).json("unable to create todo")
    }

}

const TodoListAdd = async (req,res) =>{

    
    const {Text} = req.body;
    const user = req.user

    if(Text==""){
        const todo = await Todo.findOne({user: user._id});
        return res.status(200).json(todo)
    }
    const updatedTodo = await Todo.findOneAndUpdate(
        {user: user._id},
        {$push: {subTodo:{title:Text}}},
        {new: true}
    )
    return res.status(200).json(updatedTodo)
}

const todolistDelete = async (req,res) =>{

    const user = req.user;
    const {TodoId} = req.body;

    const newTodo = await Todo.findOneAndUpdate(
        {user:user._id},
        {$pull:{subTodo:{_id:TodoId}}},
        {new:true}
    )
    
    return res.status(200).json(newTodo)

}

export {TodoListCreate,TodoListAdd, todolistDelete}