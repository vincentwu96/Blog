import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'

import auth from '../middleware/auth.js';

const router = express.Router();

// only action that does not need auth
router.get('/', getPosts);

// need auth for any actions below
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost); // need id to update
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;