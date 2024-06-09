const app = require('express');
const router = app.Router();
const {sendemail, verifyemail} = require("../controllers/emailController");
router.post("/sendemail", sendemail);
module.exports = router;