const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//how do we use these?
const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here

router.use("/:movieId/reviews", reviewsRouter);
router.use("/:movieId/theaters", theatersRouter);

router.route("/")
  .get(controller.list) //GET /movies?is_showing=true
  .all(methodNotAllowed);

router.route("/:movieId")
  .get(controller.read) //(incorrect ID)
  .all(methodNotAllowed);

router.route("/:movieId/theaters")
  .get(controller.list)
  .all(methodNotAllowed);

router.route("/:movieId/reviews")
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;