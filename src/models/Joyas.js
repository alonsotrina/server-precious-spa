const { DB } = require('../config/db')
const format = require('pg-format')

const getJewelry = async (limit = 6, order_by = "id_ASC", page = 1) => {
    try {

        const [campo, direccion] = order_by.split("_")
        const offset = Math.abs((page - 1) * limit)

        const SqlQuery = format('SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s', campo, direccion, limit, offset);
        const { rows } = await DB.query(SqlQuery)

        const countQuery = 'SELECT COUNT(*) AS count FROM inventario';
        const { rows: [{ count }] } = await DB.query(countQuery);

        const totalPages = Math.ceil(count / limit);
        const currentPage = Math.min(Number(page), totalPages);

        const pagination = {
            current_page: currentPage,
            total_pages: totalPages,
            next_page: currentPage < totalPages ? currentPage + 1 : null,
            prev_page: currentPage > 1 ? currentPage - 1 : null,
        };

        return {
            total: count,
            results: rows,
            pagination,
        }

    } catch (error) {
        throw error
    }
}


const getJewelryFilter = async (precio_max, precio_min, categoria, metal) => {
    try {
        const { query, queryCount } = auxfilterJewelry(precio_max, precio_min, categoria, metal)

        const { rows } = await DB.query(query)

         const { rows: countRows } = await DB.query(queryCount);
         const total = countRows[0].count;

         return {
            total: total,
            results: rows,
        }

    } catch (error) {
        throw error
    }
}


const auxfilterJewelry = (precio_max = '', precio_min = '', categoria = '', metal = '') => {
    let filtros = []
    if (precio_max) filtros.push(`precio <= ${precio_max}`)
    if (precio_min) filtros.push(`precio >= ${precio_min}`)
    if (categoria) filtros.push(`categoria = '${categoria}'`)
    if (metal) filtros.push(`metal = '${metal}'`)


   // Query filtros
   let query = "SELECT * FROM inventario";
   if (filtros.length > 0) {
       query += ` WHERE ${filtros.join(" AND ")}`;
   }

   // Query Total de elementos filtrados
   let queryCount = "SELECT COUNT(*) AS count FROM inventario";
   if (filtros.length > 0) {
        queryCount += ` WHERE ${filtros.join(" AND ")}`;
   }

   return { 
    query, 
    queryCount 
};
    
}

module.exports = {
    getJewelry,
    getJewelryFilter
}