const express = require("express");
const app = express();
const cors = require("cors");
const {initializeDatabase} = require("./db/db.connect");
 const Movie = require("./models/movie.models");

 app.use(express.json());
 app.use(cors());

initializeDatabase();


        async function createMovie(newMovie){
            try{
                const movie = new Movie(newMovie);
                const saveMovie = await movie.save();
                return saveMovie;
            }catch(error){
                throw error;
            }
        }
//post call to add movie
        app.post("/movies",async(req,res)=>{
            try{
                const savedMovie = await createMovie(req.body);
                res.status(201).json({message: "Movie added successfully.",movie:savedMovie})
            }catch(error){
                res.status(500).json({error:"Failed to add Movie"});
            }
        })
           

 //find movie with titile

 async function readMovieByTitle(movieTitle){
    try{
        const movie = await Movie.findOne({title: movieTitle});
        return movie;
    }catch(error){
        throw error;
    }

 }

 app.get("/movies/:title",async(req,res)=>{
    try{
        const movie = await readMovieByTitle(req.params.title)
        if(movie.length!=0){
        res.json(movie);
        }else{
            res.status(404).json({error:'Movie not Found'})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch movie"});
    }
 })

 //find all movies

  async function readAllMovies(){
    try{
        const allMovies = await Movie.find();
        return allMovies;
    }catch(error){
        throw error;
    }
 }

 app.get("/movies",async(req,res)=>{
    try{
        const movies = await readAllMovies()
        if(movies.length !=0){
            res.json(movies);
        }else{
            res.status(404).json({error:"No movies found"})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch Movie."})
    }
 })

//  readAllMovies();

 //get movie by director

 async function readByDirector(directorName){
    try{
        const movieByDirector = await Movie.find({director: directorName});
        return movieByDirector;
    }catch(error){
        throw error;
    }
 }

app.get("/movies/director/:director",async(req,res)=>{
    try{
        const movies = await readByDirector(req.params.director)
        if(movies.length !=0){
            res.json(movies)
        }else{
            res.status(404).json({error:"Movie not Found"})
        }

    }catch(error){
        res.status(500).json({error:"Failed to fetch Movie"})
    }
})

async function readMovieByGenre(genreName){
    try{
        const movieGenre = await Movie.find({genre:genreName});
        return movieGenre;
    }catch(error){
        throw error;
    }
}

app.get("/movies/genre/:genreName",async(req,res)=>{
    try{
        const movies = await readMovieByGenre(req.params.genreName);
        if(movies.length !=0){
            res.json(movies);
        }else{
            res.status(404).json({error:"No movie found"});
        }
    }catch(error){
        res.status(500).json({error:"failed to fetch movies"});
    }
})

//Delete function amd API
async function deleteMovie(movieId){
    try{
        const deletedMovie = await Movie.findByIdAndDelete(movieId)
        return deletedMovie;
    }catch(error){
        console.log(error);
    }
}

app.delete("/movies/:movieId", async(req,res)=>{
    try{
        const deletedMovie = await deleteMovie(req.params.movieId);
        res.status(200).json({message:"Movie deleted Successfully."})
    }catch(error){
        res.status(500).json({error:"Failed to delete Movie"})
    }
});

//update function and api

async function updateMovie(movieId,dataToupdate){
    try{
    const updateMovie = await Movie.findByIdAndUpdate(movieId,dataToupdate,{new:true})
    return updateMovie;
    }catch(error){
        console.log("Error Occurred while updating movie",error);
    }
}

app.post("/movies/:movieId", async(req,res)=>{
    try{
        const updatedMovie = await updateMovie(req.params.movieId,req.body);
        if(updatedMovie){
            res.status(200).json({message:"Movie updated Successfully."})
        }else{
            res.status(404).json({error:"Movie not found."})
        }
    }catch(error){
        res.status(500).json({error:"Failed to update Movie."})
    }
});

 const PORT = 3000
 app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
 })