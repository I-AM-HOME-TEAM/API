const db = require('../models')
const OpenAiLogs = db.open_ai_logs;

// Create Open AI Log
const addOpenAiLog = async (req, res) => {

    let info = {
        request: req.body.request,
        response: req.body.response,
    }

    const openAiLogs = await OpenAiLogs.create(info);

    res.status(200).send(openAiLogs);

    console.log(openAiLogs);
}

// Get all Open AI Logs from table
const getAllOpenAiLogs = async (req, res) => {

    let openAiLogs = await OpenAiLogs.findAll({  }); // can add attributes

    res.status(200).send(openAiLogs);

}

// Get one Open AI Log from table by id
const getOneOpenAiLog = async (req, res) => {

    let id = req.params.id;

    let openAiLogs = await OpenAiLogs.findOne({ where: { id: id }});

    res.status(200).send(openAiLogs);

}

// Update Open AI Log by id
const updateOpenAiLog = async (req, res) => {

    let id = req.params.id;

    const openAiLogs = await OpenAiLogs.update(req.body, { where: { id: id }});

    res.status(200).send('Log updated successfully!');
}

// Delete Open AI Log by id
const deleteOpenAiLog = async (req, res) => {

    let id = req.params.id;

    await OpenAiLogs.destroy({ where: { id: id } });

    res.status(200).send('Log is deleted!');

}

module.exports = {
    addOpenAiLog,
    getAllOpenAiLogs,
    getOneOpenAiLog,
    deleteOpenAiLog,
    updateOpenAiLog
}
