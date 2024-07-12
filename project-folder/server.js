const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Simulated Database
let requests = [];

app.post('/submit-justification', (req, res) => {
  const justification = req.body.justification;
  const requestId = requests.length + 1;
  requests.push({ id: requestId, justification, status: 'pending' });
  res.json({ message: 'Justification submitted', requestId });
});

app.post('/approve-justification', (req, res) => {
  const requestId = req.body.requestId;
  const request = requests.find((r) => r.id === requestId);
  if (request) {
    request.status = 'approved';
    res.json({ message: 'Justification approved' });
  } else {
    res.status(404).json({ message: 'Request not found' });
  }
});

app.post('/reject-justification', (req, res) => {
  const requestId = req.body.requestId;
  const request = requests.find((r) => r.id === requestId);
  if (request) {
    request.status = 'rejected';
    res.json({ message: 'Justification rejected' });
  } else {
    res.status(404).json({ message: 'Request not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
