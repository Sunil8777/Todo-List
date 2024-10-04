import {Router} from 'express'
import {logIn, SignUp,logout} from './user.controller.js'
import jwtVerification from './auth.middleware.js';
const router = Router();

router.route('/signin').post(logIn);
router.route('/signup').post(SignUp)
router.route('/logout').post(jwtVerification,logout)

export default router;
