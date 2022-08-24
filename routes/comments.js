import { Router } from 'express'
const router = new Router()
import { checkAuth } from '../middlewares/checkAuth.js'
import { createComment } from '../controllers/comments.js'

// Create Comment
// http://localhost:3001/api/comments/:id
router.post('/:id', checkAuth, createComment)

export default router
