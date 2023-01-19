const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(
  '/',
  express.static(path.resolve(__dirname, 'src', 'public'), {
    setHeaders: function (res, path, stat) {
      res.setHeader('Cache-Control', 'max-age=31536000');
    },
  }),
);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('src', 'public', 'index.html'));
});

app.listen(port, () => {
  console.log('서버시작');
});
