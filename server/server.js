const express = require('express');
const bodyParser = require('body-parser');
const mergePptxFiles = require('./pptxCombiner');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/merge', async (req, res) => {
  const files = req.body.files;
  console.log('Received merge request for files:', files); // 로그 추가
  try {
    const mergedFilePath = await mergePptxFiles(files);
    res.download(mergedFilePath, 'merged.pptx', (err) => {
      if (err) {
        console.error('Error downloading merged PPTX file:', err);
      } else {
        fs.unlinkSync(mergedFilePath);
      }
    });
  } catch (error) {
    console.error('Error merging PPTX files:', error);
    res.status(500).send('Error merging PPTX files');
  }
});

app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
