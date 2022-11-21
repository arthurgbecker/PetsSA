import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';

// Load Config
dotenv.config({ path: './config/config.env' });

// Run Server
const server = express();
const PORT = process.env.PORT || 3000;

server.listen(PORT, console.log("Servidor PETSSA rodando em " + process.env.NODE_ENV + " na porta " + PORT + "..."));

// Define Routes
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(router);