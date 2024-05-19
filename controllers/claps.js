const Run = require("../models/run");

module.exports = {
  clap,
};

async function clap(req, res) {
  const run = await Run.findById(req.params.id);

  const clapped = run.claps;
  const clapCheck = [];
  clapped.forEach((c) => {
    clapCheck.push(c.user.toString());
  });

  if (
    run.user._id.toString() !== req.user.id &&
    clapCheck.includes(req.user.id)
  ) {
    clapped.forEach((c) => {
      if (c.user._id.toString() === req.user.id) {
        c.deleteOne({ user: req.user._id });
      }
    });
  }

  if (
    run.user._id.toString() !== req.user.id &&
    !clapCheck.includes(req.user.id)
  ) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    run.claps.push(req.body);
  }
  try {
    await run.save();
  } catch (err) {
    res.redirect("/runs");
  }
  res.redirect("/runs");
}
