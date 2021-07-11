const functions = require("firebase-functions");
const app = require("express")();
// enable cors to avoid cross origin problems when using api
const cors = require("cors")({origin: true});

app.use(cors);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const {
    getAllBooks,
    createBook,
    deleteBook,
    editBook,
    makePublished,
    getAuthorBooks
} = require('../functions/APIs/books')


app.get('/books', getAllBooks);
app.post('/books', createBook);
app.delete('/books/:bookId', deleteBook);
app.put('/books/:bookId', editBook);
app.put('/books/publish/:bookId', makePublished);
app.get('/books/:author', getAuthorBooks);



app.get('/', (req, res) => {
  res.json('Home');
});


exports.api = functions.https.onRequest(app);
