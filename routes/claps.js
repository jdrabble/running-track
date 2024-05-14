var express = require("express");
var router = express.Router();

var clapsCtrl = require("../controllers/claps");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.post("/:id/awards", ensureLoggedIn, clapsCtrl.clap);

module.exports = router;
