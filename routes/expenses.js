var express = require('express');
const jwtverification = require('./middleware/jwtverification');
const { getexpenses, getcashiers, filterexpense, addexpense } = require('../controllers/expenseController');
var router = express.Router();

/* GET users listing. */

router.get("/getexpenses",jwtverification,getexpenses)
router.get("/getcashiers",jwtverification,getcashiers)
router.post("/filterexpense",filterexpense)
router.post("/addexpense",jwtverification,addexpense)


module.exports = router;