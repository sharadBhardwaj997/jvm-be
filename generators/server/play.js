const express = require('express');
const cors = require('cors');
const app = express();
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');


const PORT = 3020;
app.use(bodyParser.json());

app.use(cors());



function zipFolder(sourceFolder, zipFilePath) {
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(zipFilePath);
      const archive = archiver('zip', { zlib: { level: 9 } });
  
      output.on('close', () => {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
        resolve(zipFilePath);
      });
  
      archive.on('error', (err) => {
        reject(err);
      });
  
      archive.pipe(output);
      archive.directory(sourceFolder, false);
      archive.finalize();
    });
  }
  


app.post('/download', (req, res) => {
    console.log(req.body);

    zipFolder('/home/sharad/Documents/ttn-project-generator-main/test901', '/home/sharad/Documents/ttn-project-generator-main/test901' + '.zip')
  .then((zipFilePath) => {
    console.log('Folder zipped successfully:', zipFilePath);
   
  }).then(

    res.download('/home/sharad/Documents/ttn-project-generator-main/test901' + '.zip', 'test901.zip')
  )
  .catch((error) => {
    console.error('Error zipping folder:', error);
  });
    
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

