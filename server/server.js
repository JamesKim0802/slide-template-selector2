const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// 정적 파일 제공
app.use('/templates', express.static(path.join(__dirname, '../public/templates')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
