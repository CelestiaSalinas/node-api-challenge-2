const express = require("express");
const actionDb = require("../data/helpers/actionModel.js");

const router = express.Router();

router.use(express.json())

router.get("/:project_id", (req, res) => {
    actionDb.get(req.params.project_id)
    .then(actions => {
        res.status(201).json(actions);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Could not add action" });
    })
})

router.post("/", (req, res) => {
    const {project_id} = req.body;
  
    if (!project_id) {
        res
        .status(400)
        .json({errorMessage: "Please provide needed info."})
    }
    else {

    actionDb.insert(req.body)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Could not add action" });
      });
  }});

  router.put("/:id", (req, res) => {
    actionDb.update(req.params.id, req.body)
      .then(action => {
        if (action) {
          res.status(200).json(action);
        } else {
          res.status(404).json({ message: "Could not find action" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Could not update action" });
      });
  });
  
  router.delete("/:id", (req, res) => {
    actionDb.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "Deleted" });
        } else {
          res.status(404).json({ message: "Could not find action" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Could not remove action" });
      });
  });

module.exports = router;