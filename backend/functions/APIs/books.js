const { db } = require('../utils/admin');

// Fetching all the books from then database and sending the resposne back to the client

const getAllBooks = async (req, res) => {
    await db
        .collection('books')
        .where("published", "==", false)
        // .orderBy('title', 'asc')
        .get()
        .then((data) => {
            const books = [];
            data.forEach((doc) => {
                books.push({id: doc.id, ...doc.data()})
            })
            console.log(books);

            return  res.status(201).json({
                message: "success retrieving books",
                data: books
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        });
}

// post a book

const createBook = async (req, res) => {
    if (req.body.title === '' || req.body.brief === '' || req.body.published === '') {
        return res.status(400).json({
            message: "Empty fields not allowed!"
        })
    }

    // for timestamp:
    const publishDate = req.body.publish_date;
    // publishDate.split('-');
    // const toTimeStampPublishDate = (new Date(publishDate[2], publishDate[1], publishDate[0])).getTime();

    const newBook = {
        title: req.body.title,
        brief: req.body.brief,
        author: db.doc('authors/' + req.body.author.toLowerCase().replace(" ", "-")),
        published: false,
        publish_date: publishDate,
        cover_image_link: req.body.cover_image_link
    };

   await db
        .collection('books')
        .doc(req.body.id)
        .set(newBook)
        .then((doc) => {
            const responseNewBook = newBook;
            responseNewBook.id = newBook.id;
            return res.status(201).json({
                message: "Success Creating Book",
                data: responseNewBook
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: "Something Went Wrong",
                error: err
            })
        });

};


const deleteBook = async (req, res) => {
    const document = db.doc(`/books/${req.params.bookId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({
                    message: "Book does not exist",
                })
            }

            return document.delete();
        })
        .then(() => {
            return res.status(201).json({
                message: "Book Deleted Successfully",
            })
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                message: "Error Deleting",
                error: err
            })
        });
}


const editBook = async (req, res) => {
    if (req.body.id) {
        res.status(403).json({message: "Not allowed to edit"})
    }

    const document = db.collection('books').doc(`${req.params.bookId}`);
    document.update({
        title: req.body.title,
        brief: req.body.brief,
        author: db.doc('authors/' + req.body.author.toLowerCase().replace(" ", "-")),
        published: false,
        publish_date: req.body.publish_date,
        cover_image_link: req.body.cover_image_link
    })
        .then(() => {
            return res.status(201).json({
                message: "Book Editing Successful!",
                newBook: document
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                message: "error while Updating",
                error: err
            });
        });
}


const getAuthorBooks = (req, res) => {

    const authorRef = db.collection('authors').doc(`${req.params.author}`);

    const document =
        db
            .collection('books')
            .where('author', '==', authorRef)
            .get()
            .then((data) => {
                const authorBooks = [];
                data.forEach((doc) => {
                    authorBooks.push({id: doc.id, ...doc.data()})
                })
                console.log(authorBooks);

                return  res.status(201).json({
                    message: "success retrieving books",
                    data: authorBooks
                });
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            });
}


const makePublished = (req, res) => {
    const document = db.collection('books').doc(`${req.params.bookId}`);
    document.update({
        published: true
    })
        .then(() => {
            res.status(201).json({
                message: "Book Published Successfully!",
                data: document
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(201).json({
                message: "Error when publishing",
                error: err
            });
        });
}

module.exports = {
    createBook,
    getAllBooks,
    deleteBook,
    editBook,
    makePublished,
    getAuthorBooks
}

