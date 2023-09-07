const express = require('express')
const bp = require('body-parser')
const cors = require('cors');

const app = express()
const port = 5001

app.use(bp.json())
app.use(express.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors());

import { Pool, PoolClient } from "pg";

app.get('/', function (req, res) {
    res.send('Aplicação rodando')
    console.log('Aplicação rodando');
})

//ESTABELECIMENTO
app.post('/addEstabelecimento', cadastrarEstabelecimento);
app.put('/editEstabelecimento/:cnpj', editarEstabelecimento);
app.delete('/deletEstabelecimento/:cnpj', deletarEstabelecimento);
app.get('/listEstabelecimento', listAllEstabelecimento);

//PARCEIRO
app.post('/addParceiro', cadastrarParceiro);
app.put('/editParceiro/:cnpj', editarParceiro);
app.delete('/deletParceiro/:cnpj', deletarParceiro);
app.get('/listParceiro', listAllParceiro);

//CONEXÃO BANCO
const DB = new Pool({
    connectionString: "postgres://ajisntze:gNdLfQIQWZ2gcQjKM9HZYV4MhGQU_bya@silly.db.elephantsql.com/ajisntze"
    // user: 'postgresql',
    // host: 'localhost',
    // database: 'API_4semestre',
    // password: '1234',
    // port: 3308
});

let connectionDB: PoolClient;

DB.connect().then(conn => {
    connectionDB = conn;
    app.listen(5001, () => {
        console.log('Servidor inicializado');
    });
});

//CRUD ESTABELECIMENTO
//Função para verificar se já tem cadastrado o cnpj
async function existeEstabelecimento(cnpj) {
    const res = await connectionDB.query(`
        SELECT
            *
        FROM
            Estabelecimentos
        WHERE
        estabelecimento_cnpj_cpf  = '${cnpj}'
    `);

    var response = false
    res.rows.forEach(estabelecimento => {
        if (estabelecimento.estabelecimento_cnpj_cpf === cnpj) {
            console.log("Existe um estabelecimento com esse CNPJ/CPF. Digite outro CNPJ/CPF")
            response = true
        }
    });
    return response
}

async function cadastrarEstabelecimento(req, res) {
    console.log("Requisição de cadastro de estabelecimento recebida.");
    const { nome, nomefantasia, cnpj, logradouro, logradouroNumero, bairro, cidade, estado, cep, regiao, telefone, saldo, volume, email, tipo, senha } = req.body;
    console.log(req.body)
    const existeCNPJ = await existeEstabelecimento(cnpj);
    if (existeCNPJ) {
        res.status(409).send({ msg: "Já existe um estabelecimento com esse CNPJ/CPF." });
    } else {
        try {
            const SQL = `
                INSERT INTO
                    Estabelecimentos("estabelecimento_razao_social","estabelecimento_nome_fantasia","estabelecimento_cnpj_cpf","estabelecimento_logradouro", "estabelecimento_logradouro_numero","estabelecimento_bairro","estabelecimento_cidade","estabelecimento_estado","estabelecimento_cep", "estabelecimento_regiao","estabelecimento_telefone","estabelecimento_saldo","estabelecimento_volume_comercializado_mes","estabelecimento_email", "estabelecimento_tipo", "estabelecimento_senha")
                VALUES ('${nome}','${nomefantasia}','${cnpj}','${logradouro}', '${logradouroNumero}','${bairro}','${cidade}','${estado}','${cep}','${regiao}','${telefone}','${saldo}','${volume}','${email}','${tipo}','${senha}')
            `
            const resultado = await connectionDB.query(SQL);
            console.log("Estabelecimento cadastrado com sucesso!");
            res.send({ msg: "Estabelecimento cadastrado com sucesso!" });
        } catch (error) {
            console.error("Erro ao cadastrar estabelecimento:", error);
            res.status(500).send({ msg: "Erro ao cadastrar estabelecimento." });
        }
    }
}


async function editarEstabelecimento(req, res) {
    console.log("Requisição de edição de estabelecimento recebida.");
    const cnpj = req.params.cnpj;
    const { nome, nomefantasia, logradouro, logradouroNumero, bairro, cidade, estado, cep, regiao, telefone, saldo, volume, email, tipo, senha } = req.body;
    console.log(req.body);
    try {
        const SQL = `
            UPDATE 
                Estabelecimentos 
            SET
                "estabelecimento_razao_social" = '${nome}',
                "estabelecimento_nome_fantasia" = '${nomefantasia}',
                "estabelecimento_logradouro" = '${logradouro}',
                "estabelecimento_logradouro_numero" = '${logradouroNumero}',
                "estabelecimento_bairro" = '${bairro}',
                "estabelecimento_cidade" = '${cidade}',
                "estabelecimento_estado" = '${estado}',
                "estabelecimento_cep" = '${cep}',
                "estabelecimento_regiao" = '${regiao}',
                "estabelecimento_telefone" = '${telefone}',
                "estabelecimento_saldo" = '${saldo}',
                "estabelecimento_volume_comercializado_mes" = '${volume}',
                "estabelecimento_email" = '${email}',
                "estabelecimento_tipo" = '${tipo}',
                "estabelecimento_senha" = '${senha}'
            WHERE
                estabelecimento_cnpj_cpf = '${cnpj}'
        `
        const resultado = await connectionDB.query(SQL);
        console.log("Estabelecimento atualizado com sucesso!");
        res.send({ msg: "Estabelecimento atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao editar estabelecimento:", error);
        res.status(500).send({ msg: "Erro ao editar estabelecimento." });
    }
}


async function deletarEstabelecimento(req, res) {
    console.log("Requisição de exclusão de estabelecimento recebida.");
    const cnpj = req.params.cnpj;
    try {

        const SQL1 = `
            DELETE FROM
                Estabelecimentos
            WHERE
                estabelecimento_cnpj_cpf = '${cnpj}'
        `
        await connectionDB.query(SQL1);
        console.log("Estabelecimento excluído com sucesso!");
        res.send({ msg: "Estabelecimento excluído com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir estabelecimento:", error);
        res.status(500).send({ msg: "Erro ao excluir estabelecimento." });
    }
}


async function listAllEstabelecimento(req, res) {
    console.log("Requisição de listagem de estabelecimento recebida.");
    try {

        const SQL = `
    SELECT 
        *
    FROM 
        Estabelecimentos
    ORDER BY
        estabelecimento_id 
    `
        //Order by é para quando fazer a edição do estabelecimento, ele permanecer na mesma posição ao invés de ir pro final da lista
        const resultado = await connectionDB.query(SQL);
        console.log("Estabelecimento listado com sucesso!");
        res.send(resultado.rows);
    } catch (error) {
        console.error("Erro ao listar estabelecimento:", error);
        res.status(500).send({ msg: "Erro ao listar estabelecimento." });
    }
}
//CRUD ESTABELECIMENTO

//CRUD PARCEIROS
//Função para verificar se já tem parceiro cadastrado no cnpj
async function existeParceiro(cnpj) {
    const res = await connectionDB.query(`
        SELECT
            *
        FROM
            Parceiros
        WHERE
            parceiro_cnpj_cpf   = '${cnpj}'
    `);

    var response = false
    res.rows.forEach(parceiro => {
        if (parceiro.parceiro_cnpj_cpf === cnpj) {
            console.log("Existe um parceiro com esse CNPJ/CPF. Digite outro CNPJ/CPF")
            response = true
        }
    });
    return response
}

async function cadastrarParceiro(req, res) {
    console.log("Requisição de cadastro de parceiro recebida.");
    const { nome, nomefantasia, cnpj, logradouro, logradouroNumero, bairro, cidade, estado, cep, regiao, telefone, saldo, cidadeatendida, dataoperacao, volume, email, tipo, senha } = req.body;
    console.log(req.body)
    const existeCNPJ = await existeParceiro(cnpj);
    if (existeCNPJ) {
        res.status(409).send({ msg: "Já existe um parceiro com esse CNPJ/CPF." });
    } else {
        try {
            const SQL = `
                INSERT INTO
                    Parceiros("parceiro_razao_social","parceiro_nome_fantasia","parceiro_cnpj_cpf","parceiro_logradouro", "parceiro_logradouro_numero","parceiro_bairro","parceiro_cidade","parceiro_estado","parceiro_cep", "parceiro_regiao","parceiro_telefone","parceiro_saldo","parceiro_cidades_atende","parceiro_data_inicio_operacao","parceiro_volume_coleta_mes","parceiro_email", "parceiro_tipo", "parceiro_senha")
                VALUES ('${nome}','${nomefantasia}','${cnpj}','${logradouro}', '${logradouroNumero}','${bairro}','${cidade}','${estado}','${cep}','${regiao}','${telefone}','${saldo}', '${cidadeatendida}','${dataoperacao}','${volume}','${email}','${tipo}','${senha}')
            `
            const resultado = await connectionDB.query(SQL);
            console.log("Parceiro cadastrado com sucesso!");
            res.send({ msg: "Parceiro cadastrado com sucesso!" });
        } catch (error) {
            console.error("Erro ao cadastrar estabelecimento:", error);
            res.status(500).send({ msg: "Erro ao cadastrar estabelecimento." });
        }
    }
}


async function editarParceiro(req, res) {
    console.log("Requisição de edição de estabelecimento recebida.");
    const cnpj = req.params.cnpj;
    const { nome, nomefantasia, logradouro, logradouroNumero, bairro, cidade, estado, cep, regiao, telefone, saldo, cidadeatendida, dataoperacao, volume, email, tipo, senha } = req.body;
    console.log(req.body);
    try {
        const SQL = `
            UPDATE 
                Parceiros 
            SET
                "parceiro_razao_social" = '${nome}',
                "parceiro_nome_fantasia" = '${nomefantasia}',
                "parceiro_logradouro" = '${logradouro}',
                "parceiro_logradouro_numero" = '${logradouroNumero}',
                "parceiro_bairro" = '${bairro}',
                "parceiro_cidade" = '${cidade}',
                "parceiro_estado" = '${estado}',
                "parceiro_cep" = '${cep}',
                "parceiro_regiao" = '${regiao}',
                "parceiro_telefone" = '${telefone}',
                "parceiro_saldo" = '${saldo}',
                "parceiro_cidades_atende" = '${cidadeatendida}',
                "parceiro_data_inicio_operacao" = '${dataoperacao}',
                "parceiro_volume_coleta_mes" = '${volume}',
                "parceiro_email" = '${email}',
                "parceiro_tipo" = '${tipo}',
                "parceiro_senha" = '${senha}'
            WHERE
                parceiro_cnpj_cpf = '${cnpj}'
        `
        const resultado = await connectionDB.query(SQL);
        console.log("Parceiro atualizado com sucesso!");
        res.send({ msg: "Parceiro atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao editar parceiro:", error);
        res.status(500).send({ msg: "Erro ao editar parceiro." });
    }
}


async function deletarParceiro(req, res) {
    console.log("Requisição de exclusão de parceiro recebida.");
    const cnpj = req.params.cnpj;
    try {

        const SQL1 = `
            DELETE FROM
                Parceiros
            WHERE
                parceiro_cnpj_cpf = '${cnpj}'
        `
        await connectionDB.query(SQL1);

        console.log("Parceiro excluído com sucesso!");
        res.send({ msg: "Parceiro excluído com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir parceiro:", error);
        res.status(500).send({ msg: "Erro ao excluir parceiro." });
    }
}


async function listAllParceiro(req, res) {
    console.log("Requisição de listagem de parceiro recebida.");
    try {

        const SQL = `
    SELECT 
        *
    FROM 
        Parceiros
    ORDER BY
        parceiro_id 
    `
        //Order by é para quando fazer a edição do parceiro, ele permanecer na mesma posição ao invés de ir pro final da lista
        const resultado = await connectionDB.query(SQL);
        console.log("Parceiro listado com sucesso!");
        res.send(resultado.rows);
    } catch (error) {
        console.error("Erro ao listar parceiro:", error);
        res.status(500).send({ msg: "Erro ao listar parceiro." });
    }
}

//CRUD PARCEIROS


