import express from 'express';
import Petshop from '../models/Petshop.js';

const petshop = express.Router();

petshop.get('/', (req, res) => {
    res.send('Rota de Pet Shops');
});


petshop.post("/register", async (req, res) => {
    
    const { nomepetshop, proprietario, cnpj, email, telefone, endereco } = req.body;

    const alreadyExistsPetshop = await Petshop.findOne({ where: { nomepetshop } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (alreadyExistsPetshop) {
        return res.status(409).json({ message: "PetShop já Cadastrado!" });
    }

    const newPetshop = new Petshop({ nomepetshop, proprietario, cnpj, email, telefone, endereco });
    const savedPetshop = await newPetshop.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Desculpe! Não foi possível registrar esse petshop" });
    });

    if (savedPetshop) res.json({ message: "PetShop Cadastrados com Sucesso!" });
});

petshop.get('/find', async (req, res) => {
    const petshops = await Petshop.findAll().catch(
        (err) => {
            console.log(err)
        }
    );

    if (petshops){
        return res.json({petshops})
    } else {
        return null
    }
})

export default petshop;