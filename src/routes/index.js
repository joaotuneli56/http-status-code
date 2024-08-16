'use strict'
const express = require('express');
const router = new express.Router()

//Ponto de acesso de get
//Retornar status 200 - OK
router.get('/', (req, res, next) => {
    res.status(200).send({
        "nome" : "João Pedro"
    });
});

//Retornar status 401
router.get('/privada', (req,res) => {
    const token = req.headers['authorization'];

    if(!token || token !== 'minhasenha'){
        return res.status(401).send('sem autorização')
    }

    res.send('Area acessada com sucesso!').status(200)

})

const tokenExemplos ={
    'tokenAdmin' : {role: 'admin'},
    'tokenUser' : {role: 'user'},
    'tokenConvidado' : {role: 'convidado'},
}

router.get('/admin', (req, res)=> {
    const token = req.headers["authorization"]

    if(!token){
        return res.status(401).send('sem autorização')
    }
    //validar se o usuario está ok
    const user = tokenExemplos[token]
    if(!user){
        return res.status(401).send('Token Inválido')
    }

    if(user.role != 'admin'){
        return res.status(403).send('Você não tem permissão para acessar aqui')
    }

    return res.send('Acesso liberado')
})

router.post('/submit', (req, res) => {
    const {nome, email} = req.body;

    if(!nome || !email){
        return res.status(400).send('Bad request.. Favor enviar nome e e-mail')
    }

    res.status(201).send('Dado criado com sucesso!');
})

module.exports = router
