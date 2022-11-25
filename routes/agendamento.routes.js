import express from 'express';
import Agendamento from '../models/Agendamento.js';

const agendamento = express.Router();

agendamento.get('/', (req, res) => {
    res.send('Rota de Agendamento');
});

agendamento.post("/register", async (req, res) => {
    
    const { idservice, datetime } = req.body;

    const newAgendamento = new Agendamento({ idservice, datetime });
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