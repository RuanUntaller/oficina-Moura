require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend está no ar',
  });
});

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});

