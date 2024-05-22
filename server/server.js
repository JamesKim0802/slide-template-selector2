const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/templates/templates.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'templates', 'templates.json'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
