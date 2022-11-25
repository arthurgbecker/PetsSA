import express from 'express';
import Pet from '../models/Pet.js';

const pet = express.Router();

pet.get('/', (req, res) => {
    res.send('Rota dos Pets');
});

pet.post("/register", async (req, res) => {
    
    const { nome, especie, raca, cor, sexo, peso, porte, nascimento, castrado, alergia, perfume, agressivo, observacao } = req.body;

    const alreadyExistsPet = await Pet.findOne({ where: { nome } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (alreadyExistsPet) {
        return res.status(409).json({ message: "Pet já Cadastrado!" });
    }

    const newPet = new Pet({ nome, especie, raca, cor, sexo, peso, porte, nascimento, castrado, alergia, perfume, agressivo, observacao });
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

pet.get('/findPet', async (req, res) => {
    const id = req.query.idPet;
    const pets = await Pet.findAll({
        where: { id: id }
    }).catch(
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

pet.post('/delete', async(req, res) => {
    const id = req.body.id;
    const deletedPet = await Pet.destroy({
        where: {
            id: id
        }
    })
    if (deletedPet) {
        res.status(200).json({ message: "Pet deletado com Sucesso!"});
    } else {
        res.status(500).json({ error: "Não foi possível deletar o Pet"});
    }
})

export default pet;