const { body, param } = require('express-validator');
const { createController, genericController } = require('chemikata');

const userFormSchema = {
  create: [
    body('name').isString().isLength({ min: 5 }),
    body('age').isInt({ min: 10, max: 60 }),
    body('email').isEmail(),
    body('gender').isIn(['male', 'female']),
    body('alive').optional().isBoolean(),
  ],
  update: [
    body('age').isInt({ min: 10, max: 60 }),
    body('alive').custom((value) => {
      if (value !== undefined) {
        throw new Error('alive must not be defined');
      }
      return true;
    }),
    param('id').isMongoId(),
  ],
};

module.exports = (UserModel) => createController(genericController(UserModel), userFormSchema);
