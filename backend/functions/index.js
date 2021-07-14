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
    getAuthorBooks,
    getAllAuthor
} = require('../functions/APIs/books')

const {
    loginUser,
    signUpUser,
    uploadBookImage,
    getUserDetails
} = require('../functions/APIs/users');


const {
    authorize
} = require('./utils/auth');

app.get('/books', getAllBooks);
app.post('/books', createBook);
app.delete('/books/:bookId', deleteBook);
app.put('/books/:bookId', editBook);
app.put('/books/publish/:bookId', makePublished);
app.get('/books/:author', getAuthorBooks);
app.get('/authors', getAllAuthor);

// Auth Api
app.post('/user/login', loginUser);
app.post('/user/register', signUpUser);
app.post('/book/image/:bookId', authorize, uploadBookImage);
app.get('/user/:userId', getUserDetails)

app.get('/', (req, res) => {
  res.json('Home');
});


exports.api = functions.https.onRequest(app);
