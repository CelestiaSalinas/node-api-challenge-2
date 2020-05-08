const express = require("express");
const projectDb = require('../data/helpers/projectModel')

const router = express.Router();

router.get("/:id/actions", (req, res) => {
    projectDb.getProjectActions(req.params.id)
    .then(actions => {
        if (actions) {
            res.status(200).json(actions);
        } else {
            res.status(404).json({ error: 'Could not find actions' })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Could not retrieve actions" });
      });
})

router.post("/", (req, res) => {
    const {name, description} = req.body;
  
    if (!name || !description) {
        res
        .status(400)
        .json({errorMessage: "Please provide needed info."})
    }
    else {
  projectDb.insert({name, description})
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not add the project" });
    });
}});

router.put("/:id", (req, res) => {
  projectDb.update(req.params.id, req.body)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ errorMessage: "Could not find the project" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not update the project" });
    });
});

router.delete("/:id", (req, res) => {
  projectDb.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Deleted" });
      } else {
        res.status(404).json({ errorMessage: "Could not find the project" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not delete the project" });
    });
});


module.exports = router;