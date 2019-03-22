const express = require("express");
const router = express.Router();

// database
const projectsDb = require("../data/helpers/projectModel");

// middleware
const nameLowercase = require("../middleware/nameLowercase");

// routes
router.get("/", async (req, res) => {
  const projects = await projectsDb.get();

  try {
    res.json(projects);
  } catch (err) {
    res.json({ message: "Could not retrieve the list of projects." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const project = await projectsDb.get(id);

  try {
    !project
      ? res
          .status(404)
          .json({ message: "There is no project with that ID number." })
      : res.json(project);
  } catch (err) {
    res.json({ message: "Could not retrieve the project." });
  }
});

router.get("/:id/actions", async (req, res) => {
  const { id } = req.params;
  const project = await projectsDb.get(id);
  const projectActions = await projectsDb.getProjectActions(id);

  try {
    !project
      ? res
          .status(404)
          .json({ message: "There is no project with that ID number." })
      : res.json(projectActions);
  } catch (err) {
    res.json({ message: "Could not retrieve the project actions." });
  }
});

router.post("/add-project", nameLowercase, async (req, res) => {
  const newProject = req.body;
  await projectsDb.insert(newProject);

  try {
    res.status(201).json({ message: `Project has been created!` });
  } catch (err) {
    res.json({ message: "Could not create a new project." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const project = await projectsDb.get(id);
  await projectsDb.remove(id);

  try {
    !project
      ? res
          .status(404)
          .json({ message: "Cannot delete a project that does not exist." })
      : res.json(project);
  } catch (err) {
    res.json({ message: "Could not delete the project." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const project = await projectsDb.get(id);
  const updatedProject = req.body;
  await projectsDb.update(id, updatedProject);

  try {
    !project
      ? res
          .status(404)
          .json({ message: "Cannot update a project that does not exist." })
      : res.json(updatedProject);
  } catch (err) {
    res.json({ message: "Could not update the project." });
  }
});

module.exports = router;