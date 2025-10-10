const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/postsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define a Post schema
const postSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  body: String
});

const Post = mongoose.model('Post', postSchema);

app.get('/api/fetch-and-save', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;

    // Save posts to DB (avoid duplicates by ID)
    const savedPosts = [];
    for (const post of posts) {
      const existing = await Post.findOne({ id: post.id });
      if (!existing) {
        const newPost = new Post(post);
        await newPost.save();
        savedPosts.push(newPost);
      }
    }

    res.json({ message: "Posts fetched and saved", savedCount: savedPosts.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch or save posts' });
  }
});

// Route to get posts from DB
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get posts from DB' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
