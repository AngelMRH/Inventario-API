// src/middlewares/validate.js
export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    next(error); // Pasa al errorHandler que maneja ZodError
  }
};
