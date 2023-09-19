const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
const bcrypt = require("bcrypt");
const port = 3001;

app.use(bp.json());
app.use(express.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

import { Pool, PoolClient } from "pg";

app.get('/', function (_, res) {
    res.send('Aplicação rodando');
    console.log('Aplicação rodando');
})

//ESTABELECIMENTO
app.post('/addEstabelecimento', cadastrarEstabelecimento);
app.put('/editar-usuario-comum-estabelecimento/:idEstabelecimento', editarEstabelecimento);
app.delete('/deletEstabelecimento/:cnpj', deletarEstabelecimento);
app.get('/listEstabelecimento', listAllEstabelecimento);
app.get('/Estabelecimento/:idEstabelecimento', getEstabelecimentoById);

//PARCEIRO
app.post('/addParceiro', cadastrarParceiro);
app.put('/editar-usuario-comum-parceiro/:idParceiro', editarParceiro);
app.delete('/deletParceiro/:cnpj', deletarParceiro);

//ADMINISTRADOR
app.post('/addAdministrador', cadastrarAdministrador);
app.put('/editAdministrador/:email', editarAdministrador);
app.delete('/deleteAdministrador/:email', deletarAdministrador);
app.get('/listAdministrador', listAllAdministrador);
app.get('/read-by-id-to-edit-admin/:razaoSocial/:tipo', SelectToEditAdmin)
app.put('/editar-usuario-comum-parceiro-by-admin/:razaoSocial/:tipoUsuario', editarAdmin)
app.get('/verifica-email/:emailEDIT', verificaEmail)

//LISTAR USUARIOS (nome, tipo e id)
app.get('/listarusuarios', getUsers); 

//FUNCIONALIDADES
app.post('/enviarToken', enviarToken);
app.post('/VerificarToken', verificarToken);
app.get('/read-by-id-to-edit/:id/:tipo', SelectToEdit);
app.put('/editSenhaRec/:email', editarSenhaRec);

//LOGIN
app.post('/login', login);

//CONEXÃO BANCO
const DB = new Pool({
    connectionString: "postgres://roafmeki:5lQ4tpGBlpol7c4O3VWcHVCKaSYS2Y9B@silly.db.elephantsql.com/roafmeki"
    // user: 'postgres',       //user PostgreSQL padrão = postgres
    // host: 'localhost',
    // database: 'API',
    // password: '',
    // port: 5432             //port PostgreSQL padrão = 5432
});

let connectionDB: PoolClient;

DB.connect().then(conn => {
    connectionDB = conn;
    app.listen(port, () => {
        console.log(`Servidor inicializado em http://localhost:${port}/`);
    });
});

const jwtSecret = '779568';

//Validação e Login no Sistema
async function login(req, res) {
    const { email } = req.body
    const { password } = req.body

    let SQL = (`SELECT *, *, *
    FROM parceiros 
    FULL JOIN estabelecimentos ON parceiro_id = estabelecimento_id 
    FULL JOIN administradores ON parceiro_id = administrador_id
    WHERE parceiros.parceiro_email = '${email}' AND parceiros.parceiro_senha = '${password}'
    OR estabelecimentos.estabelecimento_email = '${email}' AND estabelecimentos.estabelecimento_senha = '${password}'
    OR administradores.administrador_email = '${email}' AND administradores.administrador_senha = '${password}'`)

    DB.query(SQL, (err, result) => {
        if (err) {
            console.log(err)
        }

        if (result.rows.length === 1) {
            res.send({
                msg: "Usuário logado com sucesso.",
                idParceiro: result.rows.values().next().value.parceiro_id,
                idEstabelecimento: result.rows.values().next().value.estabelecimento_id,
                idAdministrador: result.rows.values().next().value.administrador_id,
            });

        } else {
            res.send({ msg: 'Email ou senha incorretos.' })

        }
    })
}

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
    const { razao_social, nome_fantasia, cnpj, logradouro, logradouroNumero, bairro, cidade, estado, cep, regiao, telefone, volume, email, tipo, senha } = req.body;
    console.log(req.body)
    const existeCNPJ = await existeEstabelecimento(cnpj);
    if (existeCNPJ) {
        res.status(409).send({ msg: "Já existe um estabelecimento com esse CNPJ/CPF." });
    } else {
        try {
            const hashSenha = await bcrypt.hash(senha, 10)
            const SQL = `
                INSERT INTO
                    Estabelecimentos("estabelecimento_razao_social","estabelecimento_nome_fantasia","estabelecimento_cnpj_cpf","estabelecimento_logradouro", "estabelecimento_logradouro_numero","estabelecimento_bairro","estabelecimento_cidade","estabelecimento_estado","estabelecimento_cep", "estabelecimento_regiao","estabelecimento_telefone","estabelecimento_volume_comercializado_mes","estabelecimento_email", "estabelecimento_tipo", "estabelecimento_senha")
                VALUES ('${razao_social}','${nome_fantasia}','${cnpj}','${logradouro}', '${logradouroNumero}','${bairro}','${cidade}','${estado}','${cep}','${regiao}','${telefone}','${volume}','${email}','${tipo}','${senha}')
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


async function editarEstabelecimento (req, res) {
    const idEstabelecimento = req.params.idEstabelecimento
    const { usuarioDados } = req.body

    const SQL = `
    UPDATE 
        Estabelecimentos 
    SET
        estabelecimento_email = '${usuarioDados.email}',
        estabelecimento_senha = '${usuarioDados.senha}',
        estabelecimento_logradouro = '${usuarioDados.logradouro}',
        estabelecimento_logradouro_numero = '${usuarioDados.numero}',
        estabelecimento_bairro = '${usuarioDados.bairro}',
        estabelecimento_cidade = '${usuarioDados.cidade}',
        estabelecimento_estado = '${usuarioDados.estado}',
        estabelecimento_cep = '${usuarioDados.cep}',
        estabelecimento_regiao = '${usuarioDados.regiao}'
    WHERE
    estabelecimento_id = '${idEstabelecimento}'
`

    DB.query(SQL, (err, _) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Editado!')
        }
    })
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


async function listAllEstabelecimento(_, res) {
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

async function getEstabelecimentoById(req, res){
    console.log("requisição de busca de estabelecimento por id recebida");
    const id = req.params.idEstabelecimento;
    try {

        const SQL1 = `
            SELECT * FROM
                Estabelecimentos
            WHERE
                estabelecimento_id = '${id}'
        `
        const resultado = await connectionDB.query(SQL1);
        console.log("Estabelecimento encontrado com sucesso!");
        res.send(resultado.rows);
    } catch (error) {
        console.error("Erro ao buscar estabelecimento:", error);
        res.status(500).send({ msg: "Erro ao buscar estabelecimento." });
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
    const { razao_social, nome_fantasia, cnpj, logradouro, logradouroNumero, bairro, cidade, estado, cep, regiao, telefone, saldo, cidadeatendida, dataoperacao, volume, email, tipo, senha } = req.body;
    console.log(req.body)
    const existeCNPJ = await existeParceiro(cnpj);
    if (existeCNPJ) {
        res.status(409).send({ msg: "Já existe um parceiro com esse CNPJ/CPF." });
    } else {
        try {
            const SQL = `
                INSERT INTO
                    Parceiros("parceiro_razao_social","parceiro_nome_fantasia","parceiro_cnpj_cpf","parceiro_logradouro", "parceiro_logradouro_numero","parceiro_bairro","parceiro_cidade","parceiro_estado","parceiro_cep", "parceiro_regiao","parceiro_telefone","parceiro_volume_coleta_mes","parceiro_email", "parceiro_tipo", "parceiro_senha")
                VALUES ('${razao_social}','${nome_fantasia}','${cnpj}','${logradouro}', '${logradouroNumero}','${bairro}','${cidade}','${estado}','${cep}','${regiao}','${telefone}','${volume}','${email}','${tipo}','${senha}')
            `
            const resultado = await connectionDB.query(SQL);
            console.log("Parceiro cadastrado com sucesso!");
            res.send({ msg: "Parceiro cadastrado com sucesso!" });
        } catch (error) {
            console.error("Erro ao cadastrar parceiro:", error);
            res.status(500).send({ msg: "Erro ao cadastrar parceiro." });
        }
    }
}


async function editarParceiro (req, res) {
    const idParceiro = req.params.idParceiro
    const { usuarioDados } = req.body
    

    const SQL = `
    UPDATE 
        Parceiros 
    SET
        parceiro_email = '${usuarioDados.email}',
        parceiro_senha = '${usuarioDados.senha}',
        parceiro_logradouro = '${usuarioDados.logradouro}',
        parceiro_logradouro_numero = '${usuarioDados.numero}',
        parceiro_bairro = '${usuarioDados.bairro}',
        parceiro_cidade = '${usuarioDados.cidade}',
        parceiro_estado = '${usuarioDados.estado}',
        parceiro_cep = '${usuarioDados.cep}',
        parceiro_regiao = '${usuarioDados.regiao}'
    WHERE
        parceiro_id = '${idParceiro}'
`

    DB.query(SQL, (err, _) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Editado!')
        }
    })
}

async function editarAdmin (req, res) {
    const razaoSocial = req.params.razaoSocial
    const tipoUsuario = req.params.tipoUsuario
    const { usuarioDados } = req.body
    
    if (tipoUsuario === 'Parceiro') {
        const SQL = `
        UPDATE 
            Parceiros 
        SET
            parceiro_email = '${usuarioDados.email}',
            parceiro_senha = '${usuarioDados.senha}',
            parceiro_logradouro = '${usuarioDados.logradouro}',
            parceiro_logradouro_numero = '${usuarioDados.numero}',
            parceiro_bairro = '${usuarioDados.bairro}',
            parceiro_cidade = '${usuarioDados.cidade}',
            parceiro_estado = '${usuarioDados.estado}',
            parceiro_cep = '${usuarioDados.cep}',
            parceiro_regiao = '${usuarioDados.regiao}'
        WHERE
            parceiro_razao_social = '${razaoSocial}'
    `
        DB.query(SQL, (err, _) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Editado!')
            }
        })
    } else if (tipoUsuario === 'Estabelecimento') {
        const SQL = `
        UPDATE 
            Estabelecimentos 
        SET
            estabelecimento_email = '${usuarioDados.email}',
            estabelecimento_senha = '${usuarioDados.senha}',
            estabelecimento_logradouro = '${usuarioDados.logradouro}',
            estabelecimento_logradouro_numero = '${usuarioDados.numero}',
            estabelecimento_bairro = '${usuarioDados.bairro}',
            estabelecimento_cidade = '${usuarioDados.cidade}',
            estabelecimento_estado = '${usuarioDados.estado}',
            estabelecimento_cep = '${usuarioDados.cep}',
            estabelecimento_regiao = '${usuarioDados.regiao}'
        WHERE
        estabelecimento_razao_social = '${razaoSocial}'
    `
    
        DB.query(SQL, (err, _) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Editado!')
            }
        })
    }


}

async function editarSenhaRec (req, res) {
    const email = req.params.email
    const tipoUsuario = req.params.tipoUsuario
    const senha = req.body
    
    if (tipoUsuario === 'Parceiro') {
        const SQL = `
        UPDATE 
            Parceiros 
        SET
            parceiro_senha = '${senha.senha}',
        WHERE
            parceiro_email = '${email}'
    `
        DB.query(SQL, (err, _) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Editado!')
            }
        })
    } else if (tipoUsuario === 'Estabelecimento') {
        const SQL = `
        UPDATE 
            Estabelecimentos 
        SET
            estabelecimento_senha = '${senha.senha}',
        WHERE
        estabelecimento_email = '${email}'
    `
    
        DB.query(SQL, (err, _) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Editado!')
            }
        })
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

//CRUD PARCEIROS

//CRUD ADMINISTRADOR
//Função para verificar se já tem cadastrado o mesmo email
async function existeAdministrador(email) {
    const res = await connectionDB.query(`
        SELECT
            *
        FROM
            Administradores
        WHERE
        administrador_email  = '${email}'
    `);

    var response = false
    res.rows.forEach(administrador => {
        if (administrador.administrador_email === email) {
            console.log("Já existe um usuário cadastrado com esse e-mail!")
            response = true
        }
    });
    return response
}

async function cadastrarAdministrador(req, res) {
    console.log("Requisição de cadastro de administrador recebida.");
    const { nome, email, senha } = req.body;
    //console.log(req.body)
    const existeEmail = await existeAdministrador(email);
    if (existeEmail) {
        res.status(409).send({ msg: "Já existe um usuário cadastrado com esse e-mail" });
    } else {
        try {
            //encriptar senha
            const hashSenha = await bcrypt.hash(senha, 10)

            //salvar no bd com a senha encriptada
            const SQL = `
                INSERT INTO
                    Administradores("administrador_nome","administrador_email","administrador_senha")
                VALUES ('${nome}','${email}','${hashSenha}')
            `
            await connectionDB.query(SQL); 
            console.log("Administrador cadastrado com sucesso!");
            res.send({ msg: "Administrador cadastrado com sucesso!" });
        } catch (error) {
            console.error("Erro ao cadastrar Administrador:", error);
            res.status(500).send({ msg: "Erro ao cadastrar administrador." });
        }
    }
}


async function editarAdministrador(req, res) {
    console.log("Requisição de edição de administrador recebida.");
    const email = req.params.email;
    const { nome, senha } = req.body;
    console.log(req.body);
    try {
        const SQL = `
            UPDATE 
                Administradores
            SET
                "administrador_nome" = '${nome}',
                "administrador_senha" = '${senha}'
            WHERE
                administrador_email = '${email}'
        `
        await connectionDB.query(SQL); 
        console.log("Administrador atualizado com sucesso!");
        res.send({ msg: "Administrador atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao editar administrador:", error);
        res.status(500).send({ msg: "Erro ao editar administrador." });
    }
}


async function deletarAdministrador(req, res) {
    console.log("Requisição de exclusão de administrador recebida.");
    const email = req.params.email;
    try {

        const SQL1 = `
            DELETE FROM
                Administradores
            WHERE
                administrador_email = '${email}'
        `
        await connectionDB.query(SQL1);
        console.log("Cadastro excluído com sucesso!");
        res.send({ msg: "Cadastro excluído com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir administrador:", error);
        res.status(500).send({ msg: "Erro ao excluir administrador." });
    }
}


async function listAllAdministrador(req, res) {
    console.log("Requisição de listagem de administradores recebida.");
    try {

        const SQL = `
    SELECT 
        *
    FROM 
        Administradores
    ORDER BY
        administrador_id 
    `
        const resultado = await connectionDB.query(SQL);
        console.log("Administradores listados com sucesso!");
        res.send(resultado.rows);
    } catch (error) {
        console.error("Erro ao listar administradores:", error);
        res.status(500).send({ msg: "Erro ao listar administradores." });
    }
}
//CRUD ADMINISTRADORES

//ENVIAR TOKEN
async function enviarToken(req, res) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const { email } = req.body;

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });

    // const transporter = nodemailer.createTransport({
    //     host: "smtp-mail.outlook.com",
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: "quantumteam23@outlook.com",
    //         pass: "quantumteam2023"
    //     }
    // });

    // transporter.sendMail({
    //     from: 'quantumteam23@outlook.com',
    //     to: email,
    //     subject: 'Seu Token',
    //     html: `Seu token é: <b>${token}</b>`
    // });

    res.send({ msg: "Sucesso"});
}

async function SelectToEdit(req, res) {
    const id = req.params.id;
    const tipo = req.params.tipo

    if (tipo ==='ComumParceiro') {
        let SQL = "SELECT parceiro_email, parceiro_senha, parceiro_logradouro, parceiro_logradouro_numero, parceiro_bairro, parceiro_cidade, parceiro_estado, parceiro_cep, parceiro_regiao FROM parceiros WHERE parceiro_ID = '"+id+"'"

        DB.query(SQL, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send({
                    email: result.rows.values().next().value.parceiro_email,
                    senha: result.rows.values().next().value.parceiro_senha,
                    logradouro: result.rows.values().next().value.parceiro_logradouro,
                    numero: result.rows.values().next().value.parceiro_logradouro_numero,
                    bairro: result.rows.values().next().value.parceiro_bairro,
                    cidade: result.rows.values().next().value.parceiro_cidade,
                    estado: result.rows.values().next().value.parceiro_estado,
                    cep: result.rows.values().next().value.parceiro_cep,
                    regiao: result.rows.values().next().value.parceiro_regiao,
                })
            }
        })
    } else if (tipo === 'ComumEstabelecimento') {
        let SQL2 = "SELECT estabelecimento_email, estabelecimento_senha, estabelecimento_logradouro, estabelecimento_logradouro_numero, estabelecimento_bairro, estabelecimento_cidade, estabelecimento_estado, estabelecimento_cep, estabelecimento_regiao FROM estabelecimentos WHERE estabelecimento_ID = '"+id+"'"

        DB.query(SQL2, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send({
                    email: result.rows.values().next().value.estabelecimento_email,
                    senha: result.rows.values().next().value.estabelecimento_senha,
                    logradouro: result.rows.values().next().value.estabelecimento_logradouro,
                    numero: result.rows.values().next().value.estabelecimento_logradouro_numero,
                    bairro: result.rows.values().next().value.estabelecimento_bairro,
                    cidade: result.rows.values().next().value.estabelecimento_cidade,
                    estado: result.rows.values().next().value.estabelecimento_estado,
                    cep: result.rows.values().next().value.estabelecimento_cep,
                    regiao: result.rows.values().next().value.estabelecimento_regiao,
                })
            }
        })
    }
}

async function SelectToEditAdmin(req, res) {
    const razaoSocial = req.params.razaoSocial;
    const tipo = req.params.tipo;

    if (tipo ==='Parceiro') {
        let SQL = "SELECT parceiro_email, parceiro_senha, parceiro_logradouro, parceiro_logradouro_numero, parceiro_bairro, parceiro_cidade, parceiro_estado, parceiro_cep, parceiro_regiao FROM parceiros WHERE parceiro_razao_social = '"+razaoSocial+"'"

        DB.query(SQL, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send({
                    email: result.rows.values().next().value.parceiro_email,
                    senha: result.rows.values().next().value.parceiro_senha,
                    logradouro: result.rows.values().next().value.parceiro_logradouro,
                    numero: result.rows.values().next().value.parceiro_logradouro_numero,
                    bairro: result.rows.values().next().value.parceiro_bairro,
                    cidade: result.rows.values().next().value.parceiro_cidade,
                    estado: result.rows.values().next().value.parceiro_estado,
                    cep: result.rows.values().next().value.parceiro_cep,
                    regiao: result.rows.values().next().value.parceiro_regiao,
                })
            }
        })
    } else if (tipo === 'Estabelecimento') {
        let SQL2 = "SELECT estabelecimento_email, estabelecimento_senha, estabelecimento_logradouro, estabelecimento_logradouro_numero, estabelecimento_bairro, estabelecimento_cidade, estabelecimento_estado, estabelecimento_cep, estabelecimento_regiao FROM estabelecimentos WHERE estabelecimento_razao_social = '"+razaoSocial+"'"

        DB.query(SQL2, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send({
                    email: result.rows.values().next().value.estabelecimento_email,
                    senha: result.rows.values().next().value.estabelecimento_senha,
                    logradouro: result.rows.values().next().value.estabelecimento_logradouro,
                    numero: result.rows.values().next().value.estabelecimento_logradouro_numero,
                    bairro: result.rows.values().next().value.estabelecimento_bairro,
                    cidade: result.rows.values().next().value.estabelecimento_cidade,
                    estado: result.rows.values().next().value.estabelecimento_estado,
                    cep: result.rows.values().next().value.estabelecimento_cep,
                    regiao: result.rows.values().next().value.estabelecimento_regiao,
                })
            }
        })
    }
}

const tokensRevogados = new Set();
//ENVIAR TOKEN

//VALIDAR TOKEN
async function verificarToken(req, res) {
    console.log("Requisição de verificação de token recebida.");
    const { token } = req.body;

    try {
        if (tokensRevogados.has(token)) {
            return res.status(401).json({ message: 'Token já foi usado.' });
        }
        
        jwt.verify(token, jwtSecret);
        tokensRevogados.add(token);

        res.status(200).json({ message: 'Token válido.' });
    } catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};
//VALIDAR TOKEN

//PROCURAR EMAIL
async function emailEstabelecimento(email) {
    console.log("Requisição de procura email estabelecimento recebida.");
    const res = await connectionDB.query(`
        SELECT
            *
        FROM
            Estabelecimentos
        WHERE
            estabelecimento_email  = '${email}'
    `);

    var response = false
    res.rows.forEach(estabelecimento => {
        if (estabelecimento.estabelecimento_email === email) {
            console.log("Email estabelecimento")
            response = true
        }
    });
    return response
}

async function verificaEmail(req, res) {
    const  emailEDIT  = req.params.emailEDIT;
  
    try {
      const query = `SELECT COUNT(*) AS count FROM parceiros WHERE parceiro_email = '${emailEDIT}';`;
        DB.query(query, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send({
                    count: result.rows.values().next().value.count
                })
            }
        })
    } catch (error) {
      console.error('Erro ao verificar o email:', error);
      res.status(500).json({ error: 'Erro ao verificar o email' });
    }
  };
// PROCURAR EMAIL

//função para retornar nome e tipo de todos os usuarios
async function getUsers(req, res) {
    try{
        const SQL1 = `
    SELECT 
        administrador_nome, administrador_id
    FROM 
        Administradores
    `
        const SQL2 = `
    SELECT
        estabelecimento_razao_social, estabelecimento_id
    FROM 
        estabelecimentos
    `
        const SQL3 = `
    SELECT
        parceiro_razao_social, parceiro_id
    FROM
        parceiros
    `
        const adms = await connectionDB.query(SQL1);
        const estabelecimentos = await connectionDB.query(SQL2);
        const parceiros = await connectionDB.query(SQL3);
        console.log("Dados recuperados com sucesso");

        const users = new Array;
        for(let i=0; i<= adms.rowCount; i++){
            if(typeof(adms.rows[i]) !== "undefined"){
                users.push({nome: adms.rows[i].administrador_nome, tipo: "Administrador", id: adms.rows[i].administrador_id})
            }             
        }
        for(let i=0; i<= parceiros.rowCount; i++){
            if(typeof(parceiros.rows[i]) !== "undefined"){
                users.push({nome: parceiros.rows[i].parceiro_razao_social, tipo: "Parceiro", id: parceiros.rows[i].parceiro_id})
            }             
        }
        for(let i=0; i<= estabelecimentos.rowCount; i++){
            if(typeof(estabelecimentos.rows[i]) !== "undefined"){
                users.push({nome: estabelecimentos.rows[i].estabelecimento_razao_social, tipo: "Estabelecimento", id: estabelecimentos.rows[i].estabelecimento_id})
            }             
        }
        
        res.send(users); 
    } catch (error) {
        console.error("Erro ao listar usuários", error);
        res.status(500).send({ msg: "Erro ao listar usuários" });
    }

}


