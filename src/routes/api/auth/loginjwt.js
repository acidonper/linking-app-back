const Express = require("express");
const router = Express.Router();
const authenticate = require("../../../controllers/auth/index");

router.post("/", authenticate.generatetoken);

module.exports = router;
