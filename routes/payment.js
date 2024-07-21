const app = require('express');
const router = app.Router();
const {order, validate} = require("../controllers/paymentController");
router.post("/order", order);
router.post("/validate", validate);
module.exports = router;