import express from "express";
import User from "../models/User.js";
import verifyToken from "../config/auth.js";

const user = express.Router();

user.get('/', (req, res) => {
    const token = req.headers['token'];
    const authData = verifyToken(token, res);
});

user.get('/find', async (req, res) => {
    const idUser = req.query.idUser;
    const user = await User.findOne({
        where: {
            id: idUser
        }
    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (user){
        return res.json({user})
    } else {
        return null
    }
})

user.post('/register', async (req, res) => {
    const { nome, email, nascimento, telefone, cep, numcasa, password, confirmepassword, admin } = req.body;

    const alreadyExistsUser = await User.findOne(
        { where: { email } }
    ).catch((err) => console.log("Error: ", err));

    if (alreadyExistsUser) {
        console.log("Usuário existente: " + alreadyExistsUser);
        return res
            .status(409)
            .json({ message: "E-mail já utilizado por outro usuário"})
    }

    const newUser = new User({ nome, email, nascimento, telefone, cep, numcasa, password, confirmepassword, admin });
    const savedUser = await newUser.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Não foi possível cadastrar o usuário"});
    });

    if (savedUser) {
        console.log(savedUser);
        res.json({ message: "Obrigado pelo cadastro!" })
    } 


})

user.post('/delete', async(req, res) => {
    const id = req.body.idUser;
    const deletedUser = await User.destroy({
        where: {
            id: id
        }
    })
    if (deletedUser) {
        res.status(200).json({ message: "Usuário deletado com Sucesso. Sua sessão será !"});
    } else {
        res.status(500).json({ error: "Não foi possível deletar o usuário"});
    }
})

export default user;