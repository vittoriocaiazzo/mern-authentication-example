const errorHandler = (e, req, res, next) => {
  let message;
  if (e.errors) {
    message = e.errors[Object.keys(e.errors)[0]].properties.message;
  }
  if (!e.errors) message = e.message;

  // sending the error response
  res.status(e.statusCode ? e.statusCode : 500).send({
    status: 'fail',
    message,
  });

  next();
};

module.exports = errorHandler;
