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

const validateLogin = [
  check('email').exists().withMessage('You must provide your email').isEmail()
    .withMessage('Your email must be a valid email'),
  check('password').exists().withMessage('You must fill in your password'),
];

export { validateUserInfo, validateLogin };
