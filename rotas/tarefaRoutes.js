// rotas REST para /api/tarefas
const express = require('express');
const router = express.Router();
const controller = require('../controllers/tarefaController');

// listar todas
router.get('/', controller.listar);

// buscar por id (opcional — boa prática para API)
router.get('/:id', controller.buscarPorId);

// criar
router.post('/', controller.criar);

// editar
router.put('/:id', controller.atualizar);

// deletar
router.delete('/:id', controller.remover);

module.exports = router;
