const openAiLogsController = require('../controllers/openAiLogsController');

const openAiLogsRouter = require('express').Router();

openAiLogsRouter.post('/add', openAiLogsController.addOpenAiLog);

openAiLogsRouter.get('/getAll', openAiLogsController.getAllOpenAiLogs);



openAiLogsRouter.get('/:id', openAiLogsController.getOneOpenAiLog);

openAiLogsRouter.put('/:id', openAiLogsController.updateOpenAiLog);

openAiLogsRouter.delete('/:id', openAiLogsController.deleteOpenAiLog);

module.exports = openAiLogsRouter;