import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static('public'));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

app.listen(port, () => {
  console.log('서버시작');
});
