var express = require('express');
const { getitems, getfooditems, replenish, filteritems } = require('../controllers/itemController');
const jwtverification = require('./middleware/jwtverification');
var router = express.Router();

/* GET users listing. */
router.get("/getfooditems/:title",getfooditems)
router.get("/getitems/:title",getitems)
router.post("/replenish",jwtverification,replenish)
router.post("/filteritems/:title",jwtverification,filteritems)

module.exports = router;
