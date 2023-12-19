'use strict';

const express = require('express');
const testData = require("./test.json")
const bodyParser = require('body-parser');
const cors = require('cors');
const shell = require('shelljs');

const app = express();
const PORT = 8000;


app.use(bodyParser.json());
app.use(cors());

let formData = {};

//Routes
app.get('/test',(req,res) => {

    return res.json(testData);
})

app.post('/api/postData', (req, res) => {
     formData = req.body;
    console.log('Received data:', formData);
    
    res.status(200).json({ message: 'Data received successfully', formData });
  });

  function getFormData() {
    return formData;
  }


app.listen(PORT, () => console.log(`Server started at port : ${PORT}`))