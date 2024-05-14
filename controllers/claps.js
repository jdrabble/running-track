const Run = require("../models/run");

module.exports = {
  clap,
};

async function clap(req, res) {
  const run = await Run.findById(req.params.id);
  console.log("IDS", run.user._id.toString(), req.user.id);
  if (run.user._id.toString() !== req.user.id) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    console.log(run, req.body);
    run.claps.push(req.body);
  }
  try {
    await run.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect("/runs");
}
