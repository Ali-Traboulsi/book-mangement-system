
// allow access to Firebase from server local environment
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

module.exports =
    {
        admin,
        db
    }