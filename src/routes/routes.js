const express = require('express')
const joyasRoutes = require('./joyas.routes')

const app = express()

app.use('/joyas', joyasRoutes)

app.use((req, res) => {
    res.status(404).send("Esta ruta no existe");
});

module.exports = app;