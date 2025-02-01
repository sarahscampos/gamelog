const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/Usuario'); // Modelo de usuário
require('dotenv').config();
const cors = require('./cors');

const router = express.Router();

router.use(cors.corsWithOptions);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Criação do token JWT
    const payload = { id: user.id }; // ID do usuário
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;