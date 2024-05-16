var express = require("express");
var router = express.Router();

var goalsCtrl = require("../controllers/goals");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/", ensureLoggedIn, goalsCtrl.index);
router.get("/new", ensureLoggedIn, goalsCtrl.new);
router.post("/", ensureLoggedIn, goalsCtrl.create);
router.get("/show/:id", ensureLoggedIn, goalsCtrl.show);
router.put("/update/:id", ensureLoggedIn, goalsCtrl.update);
router.delete("/:id", ensureLoggedIn, goalsCtrl.delete);
// router.post("/:id/addruns", ensureLoggedIn, goalsCtrl.addRuns);
router.get("/search", ensureLoggedIn, goalsCtrl.search);

module.exports = router;
