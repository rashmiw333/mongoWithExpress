const express = require("express");
const app = express();

const {initializeDatabase} = require("./db/db.connect");
const Book = require("./models/book.models");

app.use(express.json());

initializeDatabase();

async function createBook(newBook){
    try{
        const book = new Book(newBook);
        const saveBook = await book.save();
        return saveBook;
    }catch(error){
        throw error;
    }

}

//post call
app.post("/books", async(req,res)=>{
    try{
        const bookSaved = await createBook(req.body);
        res.status(201).json({message:"Book added Successfully.",book:bookSaved});
    }catch(error){
        res.status(500).json({error:"Failed to add book."})
    }
})

//Task3

async function readAllBooks(){
    try{
    const books = await Book.find();
      return books;
    }catch(error){
        throw error;
    }
}

app.get("/books", async(req,res)=>{
    try{
  const books = await readAllBooks();
  if(books.length !=0){
    res.json(books);
  }else{
    res.status(400).json({error:"Book Not Found."})
  }
    }catch(error){
    res.status(500).json({error:"Error Ocurred while Fetching Data"})
    }
})

//Task4 Create an API to get a book's detail by its title. Make sure to do error handling.

async function readBookByTitle(bookName){
    try{
        const book = await Book.findOne({title:bookName});
        return book;
    }catch(error){
        throw error;
    }
}

app.get("/books/:bookTitle", async(req,res)=>{
    try{
        const book = await readBookByTitle(req.params.bookTitle)
        if(book){
            res.json(book);
        }else{
        res.status(404).json({error:"Book Not Found"});
        }
    }catch(error){
        res.status(500).json({error:"Error Occurred While loading Data"})
    }
})

//Task 5

async function booksByAuthor(authorName){
    try{
        const books = await Book.find({author:authorName});
        return books;
    }catch(error){
        throw error;
    }
}

app.get("/books/directory/:author", async(req,res)=>{
    try{
        const books = await booksByAuthor(req.params.author)
        if(books.length !=0){
            res.json(books)
        }else{
            res.status(404).json({error:"Book Not Found."})
        }
    }catch(error){
        res.status(500).json({error:"Error Occurred While Fetching Data"})
    }
})


const PORT= 3000;
app.listen(PORT,()=>{
    console.log(`Server Started on ${PORT}`);
})