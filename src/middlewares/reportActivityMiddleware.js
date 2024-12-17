const reportarConsulta = async (req, res, next) => {
    const queryParams = req.query
    const url = req.url
    console.log(`
    Hoy ${new Date()}
    Se ha recibido una consulta en la ruta ${url}
    con los parámetros:
    `, queryParams)
    next()
}

module.exports = reportarConsulta;