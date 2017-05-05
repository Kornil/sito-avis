const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const dist = path.join(__dirname, '../../dist');

app.use(express.static(dist));

app.get('*', (req, res) => {
  console.log('hello');
  res.sendFile(path.join(dist, 'index.html'));
});

app.listen(port, () => {
  console.log(`Node.js listening on port ${port}`);
});
