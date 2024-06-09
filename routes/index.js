var express = require('express');
const { checkuserexists, insertcashier } = require('../controllers/indexController');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/checkuserexists' , checkuserexists)
router.post('/insertcashier' , insertcashier)

module.exports = router;

