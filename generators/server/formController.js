
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const yeoman = require('yeoman-environment');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const {body, validationResult } = require('express-validator');
const archiver = require('archiver');
const constants = require('../constants');
const archive = archiver('zip', {
  zlib: { level: 9 }
});


app.use(bodyParser.json());

// Define the API endpoint
app.post('/download',[
  body('appName', 'Enter a valid Project Name').notEmpty(),
  body('packageName', 'Enter a valid Enter a valid Project Group').notEmpty()
], async function(req, res) {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors : errors.array()});
  }

  var mergedObject = {
    ...JSON.parse(JSON.stringify(req.body)),
    ...JSON.parse(JSON.stringify(constants))
    };
   console.log(JSON.stringify(mergedObject));

  var newUuid = uuidv4().slice(0, -20);
  console.log("uuid created - " + newUuid);

  const projectName = req.body.appName || 'default-project';
  const targetDirectory = path.join(__dirname, projectName + '_'+newUuid);

  const generatorOptions = mergedObject || {};
  const env = yeoman.createEnv();

  env.register(path.join(__dirname, 'index.js'), 'custom-generator');
    
  try {

    await env.run('custom-generator', {
      targetDirectory,
        configOptions: generatorOptions,
        cli:false
    });
    
  } catch (error) {

    console.error(`Error running Yeoman generator: ${error.message}`);
    res.status(500).send('Error running Yeoman generator');
    
  }

  //~~~~~~~~~~~~~COMPRESSION AND FILE DOWNLOAD MECHANISM STARTS HERE~~~~~~~~~~//
  // Define the folder to zip
  const archiveName = projectName + '.zip';
  // Create a new Archiver instance
  // Catch any errors
  archive.on('error', function(err) {
    res.status(500).send({ error: err.message });
  });
  // Set the response headers
  res.setHeader('Content-Disposition', 'attachment; filename=' + archiveName);
  res.setHeader('Content-Type', 'application/zip');
  // Pipe the archive data to the response
  archive.pipe(res);
  // Append the files from the directory to the archive
  archive.directory(targetDirectory, false);
  // Finalize the archive
  archive.finalize();

});

// Start the server
const port = process.env.PORT || 3009;
app.listen(port, () => console.log(`Server listening on port ${port}`));
