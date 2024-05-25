const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at"
});

async function reviewExists(req, res, next) {
  // TODO: Write your code here
  const { reviewId } = req.params;
  const review = await service.read(reviewId)
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}

async function destroy(req, res, next) {
  // TODO: Write your code here
  await service
    .destroy(res.locals.review.review_id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

async function list(req, res) {
  // TODO: Write your code here
  const reviews = await service.list(req.params.movieId);
  if(reviews) {  
    const formattedReviews = Object.keys(reviews).map(key => addCritic(reviews[key]));
    res.json({ data: formattedReviews});
  }
}

function hasMovieIdInPath(req, res, next) {
  if (req.params.movieId) {
    return next();
  }
  methodNotAllowed(req, res, next);
}

function noMovieIdInPath(req, res, next) {
  if (req.params.movieId) {
    return methodNotAllowed(req, res, next);
  }
  next();
}

async function update(req, res) {
 const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await service.update(updatedReview);
 if(data) {
   res.json({ data: data });
 }
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
