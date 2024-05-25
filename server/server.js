const express = require('express');
const bodyParser = require('body-parser');
const pptxCombiner = require('./pptxCombiner');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.post('/merge', async (req, res) => {
    const { files } = req.body;

    try {
        const mergedPptx = await pptxCombiner(files);

        const outputPath = path.join(__dirname, 'merged.pptx');
        await mergedPptx.write(outputPath);

        const pptxBuffer = fs.readFileSync(outputPath);
        res.setHeader('Content-Disposition', 'attachment; filename=merged.pptx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
        res.send(pptxBuffer);
    } catch (error) {
        console.error('Error merging PPTX files:', error);
        res.status(500).send('Error merging PPTX files');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
