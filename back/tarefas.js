const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '2004',
    database: 'contas'
});

// Adicionar nova tarefa
router.post('/tarefas', (req, res) => {
    const { usuario_id, titulo, descricao } = req.body;

    if (!usuario_id || !titulo) {
        return res.status(400).json({ error: 'Usuário ID e título são obrigatórios' });
    }

    db.query('INSERT INTO tarefas (usuario_id, titulo, descricao) VALUES (?, ?, ?)', [usuario_id, titulo, descricao], (err, results) => {
        if (err) {
            console.error('Erro ao adicionar tarefa:', err);
            return res.status(500).json({ error: 'Erro ao adicionar tarefa' });
        }
        res.status(201).json({ msg: 'Tarefa adicionada com sucesso' });
    });
});

// Listar todas as tarefas de um usuário
router.get('/tarefas', (req, res) => {
    const { usuario_id, showCompleted } = req.query;

    if (!usuario_id) {
        return res.status(400).json({ error: 'Usuário ID é obrigatório' });
    }

    let query = 'SELECT * FROM tarefas WHERE usuario_id = ?';
    let queryParams = [usuario_id];

    if (showCompleted === 'true') {
        query += ' AND concluida = 1';
    } else if (showCompleted === 'false') {
        query += ' AND concluida = 0';
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Erro ao listar tarefas:', err);
            return res.status(500).json({ error: 'Erro ao listar tarefas' });
        }
        res.status(200).json(results);
    });
});
// Editar uma tarefa
router.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;

    db.query('UPDATE tarefas SET titulo = ?, descricao = ? WHERE id = ?', [titulo, descricao, id], (err, results) => {
        if (err) {
            console.error('Erro ao editar tarefa:', err);
            return res.status(500).json({ error: 'Erro ao editar tarefa' });
        }
        res.status(200).json({ msg: 'Tarefa editada com sucesso' });
    });
});

// Excluir uma tarefa
router.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM tarefas WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao excluir tarefa:', err);
            return res.status(500).json({ error: 'Erro ao excluir tarefa' });
        }
        res.status(200).json({ msg: 'Tarefa excluída com sucesso' });
    });
});
// Atualiza uma tarefa para marcada como concluída
router.patch('/tarefas/:id/concluir', (req, res) => {
    const { id } = req.params;
    const { data_conclusao } = req.body;
  
    db.query('UPDATE tarefas SET concluida = 1, data_conclusao = ? WHERE id = ?', [data_conclusao, id], (err, results) => {
      if (err) {
        console.error('Erro ao concluir tarefa:', err);
        return res.status(500).json({ error: 'Erro ao concluir tarefa' });
      }
      res.status(200).json({ msg: 'Tarefa concluída com sucesso' });
    });
  });
module.exports = router;