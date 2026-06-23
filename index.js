const {initializeDatabase} = require("./db/db.connect");
const Post = require("./models/posts.model");
const User = require("./models/user.model");

initializeDatabase();

const useData ={
    name: "John",
    email: "John@gmail.com",
}; 

const addUser = async()=>{
    try{
        const newUser = new User(useData);
        await newUser.save();
    }catch(error){
        console.log("Error: ",error);
    }
};

//addUser();

const postData= {
    title: "Greeting",
    content: "Have a good Day!",
    author: "6a3a59c6018f4d7e41fe38b9"
}

const addPost = async()=>{
    try{
        const newPosts = new Post(postData);
        await newPosts.save();
        console.log("Posts added Successfully.")
    }catch(error){
        console.log("Error",error);
    }
}

//addPost();

const getAllPosts = async() =>{
    try{
        const allPosts = await Post.find().populate("author");
        console.log("All Posts:", allPosts);
    }catch(error){
        console.log("Error",error);
    }
};

getAllPosts();