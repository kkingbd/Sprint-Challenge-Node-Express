const express = require('express');
const helmet = require('helmet');
const morgan = require("morgan");
const cors = require("cors");


const server = express();
const projectsRoute = require("../routes/projectsRoutes");
const actionsRoute = require("../routes/actionRoutes");

server.use(express.json());  
server.use(morgan("short"));
server.use(helmet());
server.use(cors());

module.exports = server;
