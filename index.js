const express = require("express");
const app = express();

const {initializeDatabase} = require("./db/db.connect");
const Receipe = require("./models/receipe.models");

app.use(express.json());

initializeDatabase();

//Task3,Task4,Task5
async function createReceipe(newReceipe){
    try{
        const receipe = new Receipe(newReceipe);
        const saveReceipe = await receipe.save();
        return saveReceipe;
    }catch(error){
        throw error;
    }

}

//post call
app.post("/receipes", async(req,res)=>{
    try{
        const receipeSaved = await createReceipe(req.body);
        res.status(201).json({message:"Reciepe added Successfully.",receipe:receipeSaved});
    }catch(error){
        res.status(500).json({error:"Failed to add Receipe."})
    }
})

//Task6 

async function readAllReceipes(){
    try{
    const receipes = await Receipe.find();
      return receipes;
    }catch(error){
        throw error;
    }
}

//Task6
app.get("/receipes", async(req,res)=>{
    try{
  const receipe = await readAllReceipes();
  if(receipe.length !=0){
    res.json(receipe);
  }else{
    res.status(400).json({error:"Receipe Not Found."})
  }
    }catch(error){
    res.status(500).json({error:"Error Ocurred while Fetching Data"})
    }
})

//Task 7

async function readReceipeByTitle(receipeName){
    try{
        const recipes = await Receipe.findOne({title:receipeName});
        return recipes;
    }catch(error){
        throw error;
    }
}

app.get("/reciepes/:recipeTitle", async(req,res)=>{
    try{
        const recipe = await readReceipeByTitle(req.params.recipeTitle)
        if(recipe){
            res.json(recipe);
        }else{
        res.status(404).json({error:"Receipe Not Found"});
        }
    }catch(error){
        res.status(500).json({error:"Error Occurred While loading Data"})
    }
})

//Task 8

async function receipesByAuthor(authorName){
    try{
        const receipes = await Receipe.find({author:authorName});
        return receipes;
    }catch(error){
        throw error;
    }
}

app.get("/reciepes/directory/:author", async(req,res)=>{
    try{
        const receipe = await receipesByAuthor(req.params.author)
        if(receipe.length !=0){
            res.json(receipe)
        }else{
            res.status(404).json({error:"Receipe Not Found."})
        }
    }catch(error){
        res.status(500).json({error:"Error Occurred While Fetching Data"})
    }
})

//Task 9

async function recipesByLevel(difficultyLevel){
    try{
        const recipes = await Receipe.find({difficulty:difficultyLevel});
        return recipes;
    }catch(error){
        throw error;
    }
}

app.get("/reciepes/level/:level", async(req,res)=>{
    try{
        const recipes = await recipesByLevel(req.params.level)
        if(recipes.length !=0){
            res.json(recipes)
        }else{
            res.status(404).json({error:"Receipe Not Found."})
        }
    }catch(error){
        res.status(500).json({error:"Error Occurred While Fetching Data"})
    }
})

//Task 10

async function updateReceipe(receipeId,dataToUpdate){
    try{
        const updatedReceipe = await Receipe.findByIdAndUpdate(receipeId,dataToUpdate,{new:true});
        return updatedReceipe;
    }catch(error){
        console.log("Error Occurred while updating Receipe");
    }
}

app.post("/recipes/:receipeId",async(req,res)=>{
    try{
        const updatedReceipe = await updateReceipe(req.params.receipeId,req.body);
        if(updatedReceipe){
            res.status(200).json({message:"Receipe updated Successfully."})
        }else{
            res.status(404).json({error:"Receipe does not exist."});
        }
    }catch(error){
        res.status(500).json({error:"Failed to update Reipe."})
    }
})

//Task 11 

async function updateReceipeByTitle(receipeTitle,dataToUpdate){
    try{
        const updatedReceipe = await Receipe.findOneAndUpdate({title:receipeTitle},dataToUpdate,{new:true});
        return updatedReceipe;
    }catch(error){
        console.log("Error Occurred while updating Receipe");
    }
}

app.post("/receipes/receipesByTitle/:receipeTitle",async(req,res)=>{
    try{
        const updatedReceipe = await updateReceipeByTitle(req.params.receipeTitle,req.body);
        if(updatedReceipe.length!=0){
            res.status(200).json({message:"Receipe updated Successfully."})
        }else{
            res.status(404).json({error:"Receipe does not exist."});
        }
    }catch(error){
        res.status(500).json({error:"Failed to update Receipe."})
    }
})

//Task 12

//Delete function and API
async function deleteReceipe(reciepeId){
    try{
        const deletedReceipe = await Receipe.findByIdAndDelete(reciepeId);
        return deletedReceipe;
    }catch(error){
        console.log(error);
    }
}

app.delete("/receipes/:recipeId",async(req,res)=>{
    try{
        const deletedReceipe = await deleteReceipe(req.params.recipeId)
        if(deletedReceipe){
         res.status(200).json({message:"Receipe deleted Successfully."})
        }else{
        res.status(404).json({error:"Receipe not Found"});
        }
       
    }catch(error){
        res.status(500).json({error:"Failed to delete Receipe"})
    }
})

const PORT= 3000;
app.listen(PORT,()=>{
    console.log(`Server Started on ${PORT}`);
});