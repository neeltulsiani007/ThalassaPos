var express = require('express');
const { getingredients, getingredientsbytitle, orderingredients, filteringredients } = require('../controllers/ingredientController');
const jwtverification = require('./middleware/jwtverification');
var router = express.Router();

/* GET users listing. */
router.get("/getingredientsbytitle/:title",getingredientsbytitle)
router.get("/getingredients",getingredients)
router.post("/orderingredients",jwtverification,orderingredients)
router.post("/filteringredients",jwtverification,filteringredients)


module.exports = router;