const service = require("./theaters.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const theaters = await service.list();

  for (let theater of theaters) {
    const movies = await service.listMovies(theater.theater_id);

    theater["movies"] = movies;
  }
  res.json({ data: theaters });
}

async function listSpecificMovie(req, res, next) {
  if (res.locals.movie) {
    return res.json({
      data: await service.listTheaters(res.locals.movie.movie_id),
    });
  }
  next();
}

module.exports = {
  list: [asyncErrorBoundary(listSpecificMovie), asyncErrorBoundary(list)],
};
