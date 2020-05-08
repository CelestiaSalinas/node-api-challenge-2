const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const projectRouter = require('./projects/projectRouter.js');
const actionRouter = require('./actions/actionRouter.js');
const db = require('./data/helpers/projectModel');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(logger);
server.use("/projects", projectRouter);
server.use("/actions", actionRouter);

server.get("/", (req, res) => {
    db.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: "Could not retrieve the project"})
    })
})

//middleware

function logger(req, res, next) {
    const { method, originalUrl } = req;
    console.log(`${method} to ${originalUrl}`);
  
    next();
  }

  module.exports = server;