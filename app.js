var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');
const { builtinModules } = require('module');
const pause = require('restify/lib/plugins/pre/pause');
const { response } = require('express');
const utils = require("./layers/utils");

var app = express();

//VieW Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var driver = neo4j.driver('neo4j+s://88fe744f.databases.neo4j.io', neo4j.auth.basic('neo4j','daxD3IHUjz97Ds3ZgU2wcNM_tCaunll9Ds1mjN2VSDI'));
var sessionDados = driver.session();
var sessionCadastro = driver.session();
var sessionConsulta = driver.session();

app.get('/api-cadastro-clientes/obter-dados-cadastrais', function(req, res){

    sessionDados
    .run('MATCH (cc:Cadastro:Cliente) RETURN cc')
    .then(function(result){
        var cadastroArray = [];
        result.records.forEach(function(record){
            cadastroArray.push({
                nome: record._fields[0].properties.nome,
                cpf: record._fields[0].properties.cpf,
                dataNascimento: record._fields[0].properties.dataNascimento
            });
            console.log(record._fields[0].properties);
        });

        //res.send(cadastroArray)

        res.render('index',{
            cadastro:cadastroArray
        });
    })
    .catch(function(err){
        console.log(err);

    });
});

app.get('/api-cadastro-clientes/obter-cpf-valido/:cpf', function(req, res){

    let cpf = req.params.cpf

    const cpfComPontos = utils.functions.validaCPFComPontos(cpf)
    const cpfSemPontos = utils.functions.validaCPFSemPontos(cpf)
    var cpfFinal = cpfComPontos ? cpfComPontos : cpfSemPontos

    res.send(cpfFinal)
});

app.get('/api-cadastro-clientes/obter-cliente-cadastrado/:cpf', function(req, res){

    let cpf = req.params.cpf

    sessionConsulta
    .run('MATCH (cc:Cadastro:Cliente) WHERE cc.cpf = $cpf RETURN cc',
    {cpf:cpf})
    .then(function(result){
        var cadastroArray = [];
        result.records.forEach(function(record){
            cadastroArray.push({
                nome: record._fields[0].properties.nome,
                cpf: record._fields[0].properties.cpf,
                dataNascimento: record._fields[0].properties.dataNascimento
            });
            console.log(record._fields[0].properties);
        });

        res.send(cadastroArray)
    })
    .catch(function(err){
        console.log(err);

    });

});

app.post('/api-cadastro-clientes/salvar-dados-cadastrais', function(req, res){

    const cadastrados = utils.convert.stringToJSON(req.body.data);
    var nome =  typeof req.body.nome === 'undefined' ? cadastrados.nome : req.body.nome;
    var cpf = typeof req.body.cpf === 'undefined' ? cadastrados.cpf : req.body.cpf
    var dataNascimento = typeof req.body.dataNascimento === 'undefined' ? utils.convert.diaMesAnoTimeStamp(cadastrados.dataNascimento) : utils.convert.diaMesAnoTimeStamp(req.body.dataNascimento);
    
    sessionCadastro
    .run('CREATE (cc:Cadastro:Cliente{ nome: $nome, cpf: $cpf, dataNascimento: $dataNascimento }) RETURN cc.nome', 
        {nome:nome, cpf:cpf, dataNascimento: dataNascimento})
        .then(function(result){
            res.redirect('/api-cadastro-clientes/obter-dados-cadastrais');

            sessionCadastro.close();
        })
        .catch(function(err){
            console.log(err);
    
        });

    res.redirect('/api-cadastro-clientes/obter-dados-cadastrais');
});

app.listen(3000);
console.log('Server Started on Port 3000');

module.exports = app;