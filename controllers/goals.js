const Run = require("../models/run");
const Goal = require("../models/goal");
const dayjs = require("dayjs");

module.exports = {
  index,
  new: newGoal,
  create,
  show,
  update,
  delete: deleteGoal,
  search,
};

async function index(req, res) {
  const goal = await Goal.find({ user: req.user._id })
    .populate({
      path: "runs",
      match: { status: "complete" },
    })
    .sort({ startDate: 1 });

  res.render("goals/index", { goal, dayjs: dayjs, message: "" });
}

async function newGoal(req, res) {
  res.render("goals/new", { dayjs: dayjs, message: "" });
}

async function create(req, res) {
  const goalDuplicate = await Goal.find({
    startDate: req.body.startDate,
    user: req.user._id,
  });
  const run = await Run.find({ user: req.user.id });

  if (goalDuplicate.length) {
    res.render("goals/new", {
      dayjs: dayjs,
      message: "Goal already exists for this date",
    });
  }
  try {
    if (!goalDuplicate.length) {
      req.body.user = req.user._id;
      req.body.userName = req.user.name;
      req.body.userAvatar = req.user.avatar;
      const goal = await Goal.create(req.body);

      if (run.length) {
        for (let i = 0; i < run.length; i++) {
          if (
            run[i].date.getMonth() === goal.startDate.getMonth() &&
            run[i].date.getYear() === goal.startDate.getYear()
          ) {
            goal.runs.push(run[i].id);
            await goal.save();
          }
          await goal.save();
        }
      }
    }
    res.redirect("/goals");
  } catch (error) {
    res.render("goals/new", { dayjs: dayjs, message: error });
  }
}

async function show(req, res) {
  const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });

  if (!goal) {
    return res.redirect("/");
  } else if (goal.user._id.toString() === req.user.id);
  {
    res.render("goals/show", { goal, dayjs: dayjs, message: "" });
  }
}

async function update(req, res) {
  const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });
  const goalUpdate = await Goal.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  goalUpdate.targetRuns = req.body.targetRuns;
  try {
    await goalUpdate.save();
    res.redirect("/goals");
  } catch (err) {
    res.render("goals/show", {
      goal,
      dayjs: dayjs,
      message: err.message,
    });
  }
}

async function deleteGoal(req, res) {
  await Goal.deleteOne({ _id: req.params.id, user: req.user._id });
  res.redirect("/goals");
}

async function search(req, res) {
  for (let key in req.query) {
    if (req.query[key] === "") delete req.query[key];
  }

  try {
    const goal = await Goal.find({
      startDate: req.query.startDate,
      user: req.user._id,
    })
      .populate({
        path: "runs",
        match: { status: "complete" },
      })
      .sort({
        startDate: 1,
      });

    if (goal.length < 1) {
      res.render("goals/index", { goal, dayjs, message: "No goals found" });
    }

    res.render("goals/index", { goal, dayjs: dayjs, message: "" });
  } catch (err) {
    res.redirect("back");
  }
}
