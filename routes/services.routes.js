import express from 'express';

const services = express.Router();

services.get('/', (req, res) => {
    res.send('Rota de Serviços');
});

export default services;