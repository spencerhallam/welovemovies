const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// TODO: Add your routes here
router.route("/:movieId")
  .put(controller.update)//(incorrect ID) {"error": "Review cannot be found."}
  .delete(controller.destroy)//(incorrect ID) {"error": "Review cannot be found."}
  .all(methodNotAllowed);


module.exports = router;
