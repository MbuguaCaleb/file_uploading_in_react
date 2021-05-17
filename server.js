const express = require('express');
const fileUpload = require('express-fileupload');

/*Initializing my App*/
const app = express();

//Initialize my file upload into express
app.use(fileUpload());

//UPLOAD Endpoint

app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  //If my request has a file
  const file = req.files.file;

  /**Moving file to client directory */
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
app.listen(5000, () => console.log(`Server is Running`));
