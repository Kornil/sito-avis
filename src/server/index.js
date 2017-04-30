const express = require('express');
const path = require('path');
const firebase = require('firebase');
const app = express();
const port = process.env.PORT || 3000;
const dist = path.join(__dirname, '../../dist');

app.use(express.static(path.join(__dirname, '../../dist')));

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_API_KEY,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

app.get('*', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.listen(port, () => {
  console.log(`Node.js listening on port ${port}`);
});
