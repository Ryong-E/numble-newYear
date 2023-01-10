const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use('/', express.static('public'));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

app.listen(port, () => {
  console.log('서버시작');
});
