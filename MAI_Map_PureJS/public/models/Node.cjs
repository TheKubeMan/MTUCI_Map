const { spawn } = require('child_process');

const express = require('express');
const app = express();
const port = 3000;

app.post('/yourNodeEndpoint', (req, res) => {
  const str1 = req.query.str1;
  const str2 = req.query.str2;

  const pythonProcess = spawn('python', ['./python.py', str1, str2]);
  let pythonOutput = '';

  pythonProcess.stdout.on('data', (data) => {
      pythonOutput += data;
  });

  pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
        try {
            const result = JSON.parse(pythonOutput);
            res.send(result);
        } catch (error) {
            console.error('Error parsing JSON:', error.message, 'Python output:', pythonOutput);
            res.status(500).send(`${pythonOutput}`);
        }
    } else {
        console.error(`Python script exited with code ${code}`);
        res.status(500).send(`Python script error: Exit code ${code}`);
    }});
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
