import { Router } from "express";
import { createPost , getAll , getById , updatePost, getMyPosts, removePost, getPostComments} from "../controllers/posts.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = new Router();

//Create Post
//http://localhost:3001/api/posts
router.post("/", checkAuth, createPost);

//Get all posts
//http://localhost:3001/api/posts
router.get("/", getAll);

// Get Post By Id
// http://localhost:3001/api/posts/:id
router.get('/:id', getById)

// Update Post
// http://localhost:3001/api/posts/:id
router.put('/:id', checkAuth, updatePost)

// Get My Posts
// http://localhost:3001/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts)

// Remove Post
// http://localhost:3001/api/posts/:id
router.delete('/:id', checkAuth, removePost)

// Get Post Comments
// http://localhost:3001/api/posts/comments/:id
router.get('/comments/:id', getPostComments)

export default router
