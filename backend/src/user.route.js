import {Router} from 'express'
import {logIn, SignUp,logout} from './user.controller.js'
import jwtVerification from './auth.middleware.js';
import { TodoListAdd, TodoListCreate, todolistDelete } from './Todo.controller.js';
const router = Router();

router.route('/signin').post(logIn)
router.route('/signup').post(SignUp)
router.route('/logout').post(jwtVerification,logout)
router.route('/todolist').post(TodoListCreate)
router.route('/todolistAdd').post(jwtVerification,TodoListAdd)
router.route('/todolistDelete').post(jwtVerification,todolistDelete)

export default router;
