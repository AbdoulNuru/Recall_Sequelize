import { Shares } from '../db/models';

class shareController {
  static async createIdea(req, res) {
    try {
      const { userId, message } = req.body;
      const idea = await Shares.create({
        userId,
        body: message,
      });

      return res.status(201).json({
        status: 201,
        message: 'Successfully shared',
        data: idea,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}

export default shareController;
