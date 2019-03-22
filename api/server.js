const express = require('express');
const helmet = require('helmet');
const morgan = require("morgan");
const cors = require("cors");


const server = express();
const projectsRoute = require("../routes/projectRoutes");
const actionsRoute = require("../routes/actionRoutes");

server.use(express.json());  
server.use(morgan("short"));
server.use(helmet());
server.use(cors());

// routing
server.use("/projects", projectsRoute);
server.use("/actions", actionsRoute);

module.exports = server;
