import jwt from 'jsonwebtoken';

class authorize {
  static generateToken(email) {
    return jwt.sign(email, process.env.SECRET);
  }
}

export default authorize;
