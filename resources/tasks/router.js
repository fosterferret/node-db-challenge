const express = require("express");
const Tasks = require("./model");
const router = express.Router();


// retrieving a list of tasks - TESTED
router.get("/", (req, res) =>
  Tasks.getTasks()
    .then(tasks => {
      const updated = tasks.map(task => {
        if (task.completed === 0) {
          task.completed = false;
        } else if (task.completed === 1) {
          task.completed = true;
        }
        return task;
      });
      res.status(200).json(updated);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not get tasks" });
    })
);

//STRETCH
router.get("/:id", (req, res) => {
  Tasks.getTaskById(req.params.id)
    .then(task => {
      if (task) {
        const updated = {
          ...task,
          completed: task.completed === 1 ? true : false
        };
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "Could not find the task" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not to get task" });
    });
});

module.exports = router;
