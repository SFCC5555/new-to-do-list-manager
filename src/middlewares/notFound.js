// Middleware function to handle 404 "Not Found" errors
const notFound = (req, res) => {
  res.status(404).send("404 Not Found: Route does not exist");
};

module.exports = notFound;
