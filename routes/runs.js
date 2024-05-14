var express = require("express");
var router = express.Router();

var runsCtrl = require("../controllers/runs");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/", ensureLoggedIn, runsCtrl.index);
router.get("/:id/new", ensureLoggedIn, runsCtrl.new);
router.post("/:id/goal", ensureLoggedIn, runsCtrl.create);
router.get("/show/:id", ensureLoggedIn, runsCtrl.show);
router.put("/update/:id", ensureLoggedIn, runsCtrl.update);
router.delete("/:id", ensureLoggedIn, runsCtrl.delete);
router.get("/search", ensureLoggedIn, runsCtrl.search);

module.exports = router;
