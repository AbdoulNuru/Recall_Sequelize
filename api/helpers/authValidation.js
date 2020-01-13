import { check } from 'express-validator';

const validateUserInfo = [
  check('firstName').exists().withMessage('The firstname is required').isLength({ min: 3 })
    .withMessage('Firstname must be atleast 3 characters'),
  check('lastName').exists().withMessage('The lastname is required').isLength({ min: 3 })
    .withMessage('Lastname must be atleast 3 characters'),
  check('email').exists().withMessage('The email is required').isEmail()
    .withMessage('The email field must contain a valid email address'),
  check('password').exists().withMessage('The password is required'),
];

export default validateUserInfo;
