const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    genre: {
        type: [String],
        enum: ['Fiction', 'Non-fiction', 'Business', 'Autobiography'],
        required: true
    },
    language: {
        type: String,
        required: true,
        default: 'English'
    },
    country: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    summary: {
        type: String
    },
    coverImageUrl: {
        type: String
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
