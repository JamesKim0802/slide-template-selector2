const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

app.get('/api/templates/:templateName', (req, res) => {
  const templateName = req.params.templateName;
  const templatePath = path.join(__dirname, '..', 'public', 'templates', templateName);

  fs.readFile(templatePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading template file' });
    }
    res.json({ content: data });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

