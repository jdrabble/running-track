const Run = require("../models/run");
const Goal = require("../models/goal");
const dayjs = require("dayjs");

module.exports = {
  index,
  new: newRun,
  create,
  show,
  update,
  delete: deleteRun,
  search,
};

async function index(req, res) {
  const run = await Run.find({}).sort({ date: 1 });

  let total = 0;
  for (i = 0; i < run.length; i++) {
    if (run[i].status === "complete") {
      total += run[i].distance;
    }
  }
  let totalDistance = Math.round(total / 1000);

  let time = 0;
  for (i = 0; i < run.length; i++) {
    if (run[i].status === "complete") {
      time += run[i].time;
    }
  }
  let totalTime = Math.round(time / 60);

  //console.log(run);
  res.render("runs/index", {
    run,
    totalDistance,
    totalTime,
    dayjs: dayjs,
    message: "",
  });
}

async function newRun(req, res) {
  // const path = await req.url.split("/");
  // const goalId = await path[1];
  //const goal = await Goal.findById(goalId);
  const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });
  res.render("runs/new", { goal, dayjs: dayjs, message: "" });
}

async function create(req, res) {
  //const goal = await Goal.findById(req.params.id);
  const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });
  let dateCheck = Date.parse(req.body.date);
  let dateChecked = new Date(dateCheck);

  try {
    //console.log(dateChecked.getMonth(), goal.startDate.getMonth());
    if (
      dateChecked.getMonth() === goal.startDate.getMonth() &&
      dateChecked.getYear() === goal.startDate.getYear()
    ) {
      let runData = {
        user: req.user._id,
        userName: req.user.name,
        userAvatar: req.user.avatar,
        date: req.body.date,
        month: dayjs(req.body.date).format("YYYY-MM"),
        distance: req.body.distance,
        time: req.body.time,
        speed: Math.round(req.body.distance / (req.body.time / 60) / 1000),
        terrain: req.body.terrain,
        status: req.body.status,
      };
      const run = await Run.create(runData);

      // if (req.body.status !== "planned") {
      goal.runs.push(run.id);
      await goal.save();
      // }
    }
    res.redirect("/goals");
  } catch (error) {
    console.log(error);
    // const path = await req.url.split("/");
    // const goalId = await path[1];
    res.render("runs/new", {
      // goalId,
      goal,
      dayjs: dayjs,
      message: error,
    });
  }
}

async function show(req, res) {
  //const run = await Run.findById(req.params.id);
  const run = await Run.findOne({ _id: req.params.id, user: req.user._id });
  res.render("runs/show", { run, dayjs: dayjs, message: "" });
}

async function update(req, res) {
  //const run = await Run.findById(req.params.id);
  const run = await Run.findOne({ _id: req.params.id, user: req.user._id });
  let dateCheck = Date.parse(req.body.date);
  let dateChecked = new Date(dateCheck);

  try {
    if (
      dateChecked.getMonth() === run.date.getMonth() &&
      dateChecked.getYear() === run.date.getYear()
    ) {
      run.date = req.body.date;
      run.month = dayjs(req.body.date).format("YYYY-MM");
      run.distance = req.body.distance;
      run.time = req.body.time;
      (run.speed = Math.round(req.body.distance / (req.body.time / 60) / 1000)),
        (run.terrain = req.body.terrain);
      run.status = req.body.status;
      await run.save();
    }
    res.redirect("/runs");
  } catch (err) {
    console.log(err);
    res.render(`runs/show/${run.id}`, {
      run,
      dayjs: dayjs,
      message: err.message,
    });
  }
}

async function deleteRun(req, res) {
  // const run = await Run.findById(req.params.id);
  // const run = await Run.findByIdAndDelete(req.params.id);
  await Run.deleteOne({ _id: req.params.id, user: req.user._id });
  //console.log("XXX", run.user);
  res.redirect("/runs");
}

async function search(req, res) {
  for (let key in req.query) {
    if (req.query[key] === "") delete req.query[key];
  }
  console.log("QUERY", req.query);
  // { date: { $gte: req.query.date, $lte: req.query.enddate } }
  // const run = await Run.find(req.query).sort({
  //   date: 1,
  // });

  try {
    const run = await Run.find(req.query).sort({
      date: 1,
    });
    if (run.length < 1) {
      res.render("runs/index", {
        run,
        totalDistance: 0,
        totalTime: 0,
        dayjs,
        message: "No runs found",
      });
    }
    let total = 0;
    for (i = 0; i < run.length; i++) {
      if (run[i].status === "complete") {
        total += run[i].distance;
      }
    }
    let totalDistance = Math.round(total / 1000);
    let time = 0;
    for (i = 0; i < run.length; i++) {
      if (run[i].status === "complete") {
        time += run[i].time;
      }
    }
    let totalTime = Math.round(time / 60);
    console.log("RESULT", run);
    res.render("runs/index", {
      run,
      totalDistance,
      totalTime,
      dayjs: dayjs,
      message: "",
    });
  } catch (err) {
    console.log(err);
  }
}