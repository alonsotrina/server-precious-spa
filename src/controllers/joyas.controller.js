const Joyas = require('../models/Joyas')

const createStructureHATEOAS = (data) => {
    const results = data.map((d) => ({
        id: d.id,
        name: d.nombre,
        categoria: d.categoria,
        metal: d.metal,
        precio: d.precio,
        stock: d.stock,
        url: `/api/joyas/${d.id}`,
    }));

    return results;
};


const getAllJewelry = async (req, res, next) => {
    try {
        const { limit, order_by, page } = req.query
        
        const consulta = await Joyas.getJewelry(limit, order_by, page)
        const response = createStructureHATEOAS(consulta.results);

        res.status(200).json({
            msg: 'Listado de joyas',
            data: {
                total: consulta.total,
                response,
                pagination: consulta.pagination,
            },
        })
    } catch (error) {
        next(error)
    }
}


const getFilterJewelry = async (req, res, next) => {
    try {
        const { precio_max, precio_min, categoria, metal } = req.query
 
        const consulta = await Joyas.getJewelryFilter(precio_max, precio_min, categoria, metal)
        const response = createStructureHATEOAS(consulta.results);


        res.status(200).json({
            msg: 'Listado de joyas filtrados',
            data: {
                total: consulta.total,
                response,
           
            }
        
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllJewelry,
    getFilterJewelry
}