const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const tarefas = require('./tarefas'); // Importa as rotas de tarefas

// Configuração do pool de conexões MySQL
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '2004',
    database: 'contas'
});

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', tarefas); // Usa as rotas de tarefas

// Cadastro de usuário
app.post('/cadastro', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Erro na consulta ao banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
        }
        if (results.length === 0) {
            bcrypt.hash(password, saltRounds, (hashErr, hash) => {
                if (hashErr) {
                    console.error('Erro ao hash da senha:', hashErr);
                    return res.status(500).json({ error: 'Erro ao criar hash da senha' });
                }

                db.query('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, hash], (dbErr, response) => {
                    if (dbErr) {
                        console.error('Erro ao inserir no banco de dados:', dbErr);
                        return res.status(500).json({ error: 'Erro ao criar usuário' });
                    }
                    res.status(201).json({ msg: 'Usuário cadastrado com sucesso' });
                });
            });
        } else {
            res.status(409).json({ msg: 'Usuário já cadastrado' });
        }
    });
});

// Login de usuário
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
        }
        if (results.length > 0) {
            bcrypt.compare(password, results[0].senha, (compareErr, isMatch) => {
                if (compareErr) {
                    console.error('Erro ao comparar senhas:', compareErr);
                    return res.status(500).json({ error: 'Erro ao comparar senhas' });
                }

                if (isMatch) {
                    res.status(200).json({ msg: 'Usuário logado com sucesso', userId: results[0].id });
                } else {
                    res.status(401).json({ error: 'Senha incorreta' });
                }
            });
        } else {
            res.status(404).json({ msg: 'Email não encontrado' });
        }
    });
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
