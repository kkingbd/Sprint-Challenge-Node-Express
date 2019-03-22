const express = require("express");
const router = express.Router();

// database
const actionsDb = require("../data/helpers/actionModel");

// middleware
const desLength = require("../middleware/desLength");

// routes
router.get("/", async (req, res) => {
  const actions = await actionsDb.get();

  try {
    res.json(actions);
  } catch (err) {
    res.json({ message: "Could not retrieve the list of actions." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const action = await actionsDb.get(id);

  try {
    !action
      ? res
          .status(404)
          .json({ message: "There is no action with that ID number." })
      : res.json(action);
  } catch (err) {
    res.json({ message: "Could not retrieve the action." });
  }
});

router.post("/add-action", desLength, async (req, res) => {
  const newAction = req.body;
  await actionsDb.insert(newAction);

  try {
    res.status(201).json({ message: `A new action has been created!` });
  } catch (err) {
    res.json({ message: "Could not create a new action." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const action = await actionsDb.get(id);
  await actionsDb.remove(id);

  try {
    !action
      ? res
          .status(404)
          .json({ message: "Cannot delete an action that does not exist." })
      : res.json(action);
  } catch (err) {
    res.json({ message: "Could not delete the action." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const action = await actionsDb.get(id);
  const updatedAction = req.body;
  await actionsDb.update(id, updatedAction);

  try {
    !action
      ? res
          .status(404)
          .json({ message: "Cannot update an action that does not exist." })
      : res.json(updatedAction);
  } catch (err) {
    res.json({ message: "Could not update the action." });
  }
});

module.exports = router;