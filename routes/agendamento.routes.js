import express from 'express';
import Agendamento from '../models/Agendamento.js';

const agendamento = express.Router();

agendamento.get('/', (req, res) => {
    res.send('Rota de Agendamento');
});

agendamento.post("/register", async (req, res) => {
    
    const { idservice, nomeagendamento, nomepet, date, time } = req.body;

    const newAgendamento = new Agendamento({ idservice, nomeagendamento, nomepet, date, time });
    const savedAgendamento = await newAgendamento.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Desculpe. Não foi possível realizar este agendamento." });
    });

    if (savedAgendamento) res.json({ message: "Agendamento realizado com Sucesso!" });
});

agendamento.get('/find', async (req, res) => {
    const agendamentos = await Agendamento.findAll().catch(
        (err) => {
            console.log(err)
        }
    );

    if (agendamentos){
        return res.json({agendamentos})
    } else {
        return null
    }
})

export default agendamento;