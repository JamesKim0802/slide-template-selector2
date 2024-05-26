const express = require('express');
const bodyParser = require('body-parser');
const mergePptxFiles = require('./pptxCombiner');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post('/merge', (req, res) => {
  const files = req.body.files;
  const mergedFilePath = mergePptxFiles(files);

  res.download(mergedFilePath, 'merged.pptx', (err) => {
    if (err) {
      console.error('Error downloading merged PPTX file:', err);
    } else {
      fs.unlinkSync(mergedFilePath);
    }
  });
});

app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
