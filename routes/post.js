import express from "express";

// importing controllers 
import { getPosts, createPosts, updatePost, deletePost, likePost } from '../controller/posts.js' 
// Here dont forget to give .js bcz in node its required 
const router = express.Router();
// import auth to verify user

import auth from '../middleware/authMiddleware.js'
// it contains two params url and callback func which will call when user visit this route
router.get('/', getPosts);
router.post('/',auth, createPosts);
router.patch('/:id', auth, updatePost); // permisson to like , update , delete , use auth middleware
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;