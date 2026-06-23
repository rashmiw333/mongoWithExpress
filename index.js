 require("./db/db.connect");
const Post = require("./models/posts.model");
const User = require("./models/user.model");

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

addUser();