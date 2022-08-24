import {Router } from 'express' 
import {register, login , getMe} from '../controllers/auth.js'
import { checkAuth } from '../middlewares/checkAuth.js'

const router = new Router()

//Registration
//http://localhost:3001/api/auth/register
router.post('/register', register)

//Login 
//http://localhost:3001/api/auth/login
router.post('/login', login)

//Get me
//http://localhost:3001/api/auth/me
router.get('/me', checkAuth, getMe)

export default router