import express from 'express';
import Pet from '../models/Pet.js';

const pet = express.Router();

pet.get('/', (req, res) => {
    res.send('Rota dos Pets');
});

pet.post("/register", async (req, res) => {
    
    const { nome, especie, raca, cor, sexo, peso, porte, nascimento, castrado, alergia, perfume, agressivo, observacao, imagempet } = req.body;

    const alreadyExistsPet = await Pet.findOne({ where: { nome } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (alreadyExistsPet) {
        return res.status(409).json({ message: "Pet já Cadastrado!" });
    }

    const newPet = new Pet({ nome, especie, raca, cor, sexo, peso, porte, nascimento, castrado, alergia, perfume, agressivo, observacao, imagempet });
    const savedPet = await newPet.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Desculpe! Não foi possível cadastrar esse pet" });
    });

    if (savedPet) res.json({ message: "Pet Cadastrado com Sucesso!" });
});

pet.get('/find', async (req, res) => {
    const pets = await Pet.findAll().catch(
        (err) => {
            console.log(err)
        }
    );

    if (pets){
        return res.json({pets})
    } else {
        return null
    }
})

export default pet;