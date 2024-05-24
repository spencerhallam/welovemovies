const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(req, res, next) {
  // TODO: Add your code here.
  const { movieId } = req.params;
  const movie = await service.read(movieId)
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function destroy(req, res) {
  // TODO: Write your code here

}

async function list(req, res) {
  // TODO: Write your code here

  res.json({  });
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
  // TODO: Write your code here

}

//async function update(req, res) {
//  const updatedPost = {
//    ...req.body.data,
//    post_id: res.locals.post.post_id,
//  };
//  const data = await service.update(updatedPost);
//  if(data) {
//    res.json({ data: data[0] });
//  }
//}

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
