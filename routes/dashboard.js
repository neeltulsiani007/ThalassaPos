var express = require('express');
const jwtverification = require('./middleware/jwtverification');
const { getdata, getgraph, getingbyqty, getitemindesc } = require('../controllers/dashboardController');
var router = express.Router();

router.get("/getdata",jwtverification,getdata)
router.get("/getgraph",getgraph)
router.get("/getingqty",jwtverification,getingbyqty)
router.get("/getitemdesc",jwtverification,getitemindesc)


module.exports = router;