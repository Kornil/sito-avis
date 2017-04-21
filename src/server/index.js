const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const build = path.join(__dirname, '../../build');

app.use(express.static(path.join(__dirname, '../../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(build, 'index.html'));
});

app.listen(port, () => {
  console.log(`Node.js listening on port ${port}`);
});
