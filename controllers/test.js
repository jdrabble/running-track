// async function addRuns(req, res) {
//     const goal = await Goal.findById(req.params.id);
//     const run = await Run.find({ user: req.user.id, status: "complete" });

//     for (let i = 0; i < run.length; i++) {
//       if (
//         run[i].date.getMonth() === goal.startDate.getMonth() &&
//         run[i].date.getYear() === goal.startDate.getYear()
//       ) {
//         //console.log(run[i].id, goal.id);
//         goal.runs.push(run[i].id);
//         await goal.save();
//       }
//       goal.synced = "yes";
//       await goal.save();
//     }

//     res.redirect("/goals");
//   }

//   async function create(req, res) {
//     const goalDuplicate = await Goal.find({ startDate: req.body.startDate });

//     if (goalDuplicate.length) {
//       res.render("goals/new", { message: "Goal already exists for this date" });
//     }
//     try {
//       if (!goalDuplicate.length) {
//         req.body.synced = "";
//         req.body.user = req.user._id;
//         req.body.userName = req.user.name;
//         req.body.userAvatar = req.user.avatar;
//         const goal = await Goal.create(req.body);
//       }
//       res.redirect("/goals");
//     } catch (error) {
//       console.log(error);
//       res.render("goals/new", { message: error });
//     }
//   }

//   async function create(req, res) {
//     const goalDuplicate = await Goal.find({ startDate: req.body.startDate, user: req.user._id, });
//     const run = await Run.find({ user: req.user.id, status: "complete" });

//     if (goalDuplicate.length) {
//       res.render("goals/new", { message: "Goal already exists for this date" });
//     }
//     try {
//       if (!goalDuplicate.length) {
//         req.body.synced = "";
//         req.body.user = req.user._id;
//         req.body.userName = req.user.name;
//         req.body.userAvatar = req.user.avatar;
//         const goal = await Goal.create(req.body);
//       }
//       if (run.length) {
//       for (let i = 0; i < run.length; i++) {
//         if (
//           run[i].date.getMonth() === goal.startDate.getMonth() &&
//           run[i].date.getYear() === goal.startDate.getYear()
//         ) {
//           //console.log(run[i].id, goal.id);
//           goal.runs.push(run[i].id);
//           await goal.save();
//         }
//         goal.synced = "yes";
//         await goal.save();
//       }
//     }
//       res.redirect("/goals");
//     } catch (error) {
//       console.log(error);
//       res.render("goals/new", { message: error });
//     }
//   }
