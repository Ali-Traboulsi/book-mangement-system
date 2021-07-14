const { admin, db } = require('../utils/admin');
const config = require('../utils/config');
const Busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');


const firebase = require('firebase');

firebase.initializeApp(config);

const { validateLoginData, validateSignUpData } = require('../utils/validators');

// login API
const loginUser = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    const { valid, errors } = validateLoginData(user);

    if(!valid) return res.status(400).json({
        message: "Authentication failed",
        errors: errors
    });

    let idToken;
    // let userData;

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return idToken = data.user.getIdToken();
        })
        .then((token) => {
            return res.status(201).json({
                message: "Authentication Success",
                token: idToken,
                // data: userData
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(403).json({
                message: "Wrong Credentials. Plz try again..",
                errors: err
            });
        });

};


const signUpUser = (req, res) => {

    let isAuthor = req.body.isAuthor === "author";

    if (isAuthor) {
        // create an author

        }

   const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        isAuthor: isAuthor // to check if the user is actually and author and authenticate the  author based on that
        }

    const { valid, errors } = validateSignUpData(newUser);

    if (!valid) return res.status(400).json({
        message: "Data not valid",
        errors: errors
    });

    let token, userId;

    db
        .doc(`/users/${newUser.username}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(400).json({
                    message: "User already exists"
                });
            }
            return firebase
                .auth()
                .createUserWithEmailAndPassword(newUser.email, newUser.password);
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                username: newUser.username,
                id: userId,
                createdAt: new Date().toISOString(),
                isAuthor: newUser.isAuthor
            }

            return db
                .doc(`/users/${newUser.username}`)
                .set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({
                message: "User Registered Successful!",
                data: newUser,
                token: token
            })
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                message: "An error occured",
                errors: err
            });
        });
}


const deleteImage = (imageName) => {
    const bucket = admin.storage().bucket();
    const path = `${imageName}`;
    return bucket.file(path).delete();
}


const uploadBookImage = (req, res) =>
{
    const busboy = new Busboy({headers: req.headers});

    let imageFileName;
    let imageToBeUploaded = {};
    let imageUrl;

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if (mimetype !== 'image/png' && mimetype !== 'image/jpeg' && mimetype !== 'image/svg') {
            return res.status(400).json({
                message: "File format not supported"
            });
        }
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${req.body.cover_image}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on('finish', () => {
        admin
            .storage()
            .bucket()
            .upload(imageToBeUploaded.filepath, {
                resumable: false,
                metadata: {
                    metadata: {
                        ContentType: imageToBeUploaded.mimetype
                    }
                }
            })
            .then(() => {
                imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
                // store the path in the coverImage
                return db.doc(`/books/${req.params.bookId}`).update({
                    cover_image_link: imageUrl
                });
            })
            .then(() => {
                return res.status(201).json({
                    message: "Image Upload Successful",
                    path: imageUrl,
                    data: imageToBeUploaded
                })
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({
                    message: "Error while uploading",
                    error: err
                });
            });
    });

    busboy.end(req.rawBody);

};


const getUserDetails = (req, res) => {
    let userData = {};

    db
        .doc(`/users/${req.params.userId}`)
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    message: "User does not exist",
                });
            }
            userData.userCredentials = doc.data();
            return res.status(201).json({
                message: "Success retrieving user",
                user: userData
            })

        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                message: "An Error retrieving User data",
                error: err
            });
        });
}


module.exports =
    {
        loginUser,
        signUpUser,
        uploadBookImage,
        getUserDetails
    }