const express = require("express");
const app = express();
const {initializeDatabase} = require("./db/db.connect");
 const Movie = require("./models/movie.models");

 app.use(express.json());

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
        const movie = await Movie.find({title: movieTitle});
        return movie;
    }catch(error){
        throw error;
    }

 }

 app.get("/movies/:title",async(req,res)=>{
    try{
        const movie = await readMovieByTitle(req.params.title)
        if(movie){
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
 const PORT = 3000
 app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
 })