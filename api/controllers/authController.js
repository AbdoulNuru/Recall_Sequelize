import bcrypt from 'bcryptjs';
import uuid from 'uuid/v4';
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
      const {
        firstName, lastName, email, password,
      } = req.body;

      const emailExist = await Users.findOne({
        where: {
          email,
        },
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
}

export default authController;
