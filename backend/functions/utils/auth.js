const {admin, db} = require('./admin');

const authorize = (req, res, next) => {
    let idToken;
    // check if user is authorized
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return res.status(403).json({
            message: "UnAuthorized",
        });
    }
    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
             const uid = decodedToken.uid;
            return db.collection('users').where("id", "==", uid).limit(1).get();
        })
        .then(() => {
            // req.user.username = data.docs[0].data().username;
            // req.user.imageUrl = data.docs[0].data().imageUrl;
            return next();
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                message: "Error while verifying token",
                errors: err
            });
        });
}

const authorizeAuthor = (req, res, next) => {
    let idToken;
    // check if user is authorized
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return res.status(403).json({
            message: "UnAuthorized",
        });
    }
    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            return db.collection('users').where("id", "==", uid).where("isAuthor", "==", true).limit(1).get();
        })
        .then(() => {
            // req.user.username = data.docs[0].data().username;
            // req.user.imageUrl = data.docs[0].data().imageUrl;
            return next();
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                message: "Error while verifying token",
                errors: err
            });
        });
}



module.exports =
    {
        authorize,
        authorizeAuthor
    }