import express from 'express';
import Agendamento from '../models/Agendamento.js'

const agendamento = express.Router();

agendamento.get('/', (req, res) => {
    res.send('Rota de Serviços');
});

agendamento.post("/register", async (req, res) => {
    
    const { idservice, datetime } = req.body;

    const alreadyExistsAgendamento = await Agendamento.findOne({ where: { nomeservice } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (alreadyExistsAgendamento) {
        return res.status(409).json({ message: "Agendamento já Cadastrado!" });
    }

    const newAgendamento = new Agendamento({ idservice, datetime });
    const savedAgendamento = await newAgendamento.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Desculpe! Não foi possível realizar esse Agendamento" });
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