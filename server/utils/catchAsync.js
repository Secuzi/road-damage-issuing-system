const catchAsync = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      return next(createError(404, error.message));
    }
  };
};

export default catchAsync;
