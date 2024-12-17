const { Router } = require('express')
const router = Router()
const { getAllJewelry, getFilterJewelry } = require('../controllers/joyas.controller')
const Reports = require('../middlewares/reportActivityMiddleware')

router.get("/", Reports, getAllJewelry)
router.get("/filter", Reports, getFilterJewelry)

module.exports = router;