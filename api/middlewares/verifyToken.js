import jwt from 'jsonwebtoken';
import { Users } from '../db/models';

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, process.env.SECRET);
    const userStillExist = await Users.findOne({
      where: {
        email: verify,
      },
    });

    if (userStillExist) {
      req.user = verify;
      next();
    } else {
      res.status(401).json({
        status: 401,
        message: 'You are not authorized to perform the action',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

export default isLoggedIn;
