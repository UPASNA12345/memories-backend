import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    // res.send('get posts here')
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages)

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const createPosts = async(req, res) => {
    // res.send('create posts here')
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})
    try{
          await newPost.save();

          res.status(201).json(newPost)
    }
    catch (error) {
        res.status(409).json({ message: error.message })
    }
}


export const updatePost = async(req, res) => {
  const {id: _id}  = req.params;
  const post = req.body;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that Id');
  
 const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post, _id}, {new:true});
  res.json(updatedPost);
}


export const deletePost = async(req, res) => {
    const {id: _id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that Id');
  await PostMessage.findByIdAndRemove(_id);
  res.json({message:'Post deleted successfully'})
}

export const likePost = async(req, res) => {
    const {id} = req.params;
    if(!req.userId) return res.json({message:'User is not authenticated'})
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id');
  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id)=> id === String(req.userId));

  if(index = -1){
    //to  like the post
    post.likes.push(req.userId)

  }else{
    // to dislike a post
    post.likes = post.likes.filter((id)=> id != String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new:true});
  res.json(updatedPost);

}