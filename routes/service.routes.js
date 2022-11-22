import express from 'express';
import Service from '../models/Service.js'

const service = express.Router();

service.get('/', (req, res) => {
    res.send('Rota de Serviços');
});

service.post("/register", async (req, res) => {
    
    const { iduser, idpet, nomeservice, tipo, descricao, valor, imagemservice } = req.body;

    const alreadyExistsService = await Service.findOne({ where: { nomeservice } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (alreadyExistsService) {
        return res.status(409).json({ message: "Serviço já Cadastrado!" });
    }

    const newService = new Service({ iduser, idpet, nomeservice, tipo, descricao, valor, imagemservice });
    const savedService = await newService.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Desculpe! Não foi possível cadastrar esse Serviço" });
    });

    if (savedService) res.json({ message: "Serviço Cadastrado com Sucesso!" });
});

service.get('/find', async (req, res) => {
    const services = await Service.findAll().catch(
        (err) => {
            console.log(err)
        }
    );

    if (services){
        return res.json({services})
    } else {
        return null
    }
})

service.get('/findByService', async (req, res) => {
    const idService = req.query.idService;
    const services = await Service.findAll({
        where: {
            idService: idService
        },
        include: [{model: Service}]
    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (services){
        return res.json({services})
    } else {
        return null
    }
})

export default service;