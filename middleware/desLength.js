module.exports = (req, res, next) => {
    const { description } = req.body;
  
    if (description.length <= 128) {
      req.body.description = description;
      next();
    } else {
      res
        .status(400)
        .json({ message: "Description  must be less than 128 characters." });
    }
  };