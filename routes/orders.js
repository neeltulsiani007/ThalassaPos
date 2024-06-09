var express = require('express');
const { selectorder, getcart, deletefromcart, generatebill, getbill, getorders } = require('../controllers/orderController');
var router = express.Router();

/* GET users listing. */
router.post("/selectorder",selectorder)
router.post("/deletefromcart",deletefromcart)
router.post("/generatebill",generatebill)
router.get("/getcart",getcart)
router.get("/getbill/:orderid",getbill)
router.get("/getorders",getorders)

module.exports = router;
