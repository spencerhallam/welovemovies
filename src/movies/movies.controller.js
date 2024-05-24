const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  // TODO: Add your code here.
  const { movieId } = req.params;
  const movie = await service.read(movieId)
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function read(req, res) {
  // TODO: Add your code here
    res.json({ data: res.locals.movie });
}

async function list(req, res) {
  // TODO: Add your code here.
  const movies = await service.list();
  if(req.query.is_showing && movies) {  
    res.json({ data: movies});
  }
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read]
};
