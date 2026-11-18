require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso');

  app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
  });
  
})
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error.message);
  });

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend está no ar',
  });
});


