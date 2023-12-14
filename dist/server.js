// server.js
import express from 'express';
const app = express();
const port = 3001; // 프론트엔드와 다른 포트를 사용

app.get('/cute', (req, res) => {
  res.send('hello cute');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
