import bcrypt from 'bcryptjs';
import uuid from 'uuid/v4';
import { validationResult } from 'express-validator';
import { Users } from '../db/models';

/**
 * @description Authentication Controller
 * @class authController
 */
class authController {
  /**
     * @description Sign up method
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} User
     * @memberof authController
     */
  static async register(req, res) {
    try {
      const errors = validationResult(req);
      const {
        firstName, lastName, email, password,
      } = req.body;

      if (!errors.isEmpty()) {
        return res.status(422).json({
          status: 422,
          error: errors.array(),
        });
      }

      const emailExist = await Users.findOne({
        where: {
          email,
        },
      }, {
        // This does't work
        attributes: ['userId', 'firstaName', 'lastName', 'email'],
      });

      if (emailExist) {
        return res.status(409).json({
          status: 500,
          message: 'Email already exist',
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user = await Users.create({
        userId: uuid(), firstName, lastName, email, password: hash,
      });

      return res.status(201).json({
        status: 201,
        message: 'User',
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  static async login(req, res) {
    try {
      const errors = validationResult(req);
      const {
        email, password,
      } = req.body;

      if (!errors.isEmpty()) {
        return res.status(422).json({
          status: 422,
          error: errors.array(),
        });
      }

      const emailExist = await Users.findOne({
        where: {
          email,
        },
        raw: true,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });

      if (!emailExist) {
        return res.status(404).json({
          status: 404,
          message: 'You don\' have an account, Register!!!',
        });
      }

      const comparePassword = bcrypt.compareSync(password, emailExist.password);

      if (!comparePassword) {
        return res.status(400).json({
          status: 400,
          message: 'Invalid email or password',
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'Successfully logged in',
        data: emailExist,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}

export default authController;
