import express, { Request, Response } from 'express';
import User from '../../models/User';
import {Types} from 'mongoose';
import mongoose from 'mongoose';

const router = express.Router();


router.post('/:userId/friends/:friendId', async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, friendId } = req.params;

    
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    
    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }


    const userIdObject = user._id as Types.ObjectId;
    const friendIdObject = friend._id as Types.ObjectId;

    
    if (!user.friends.includes(friendIdObject)) {
      user.friends.push(friendIdObject);  
    }
    
    
    if (!friend.friends.includes(userIdObject)) {
      friend.friends.push(userIdObject);  
    }

    
    await user.save();
    await friend.save();

    return res.json({ message: 'Friend added successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error adding friend', error: err });
  }
});
  


router.delete('/:userId/friends/:friendId', async (req: Request, res: Response):Promise<any> => {
  try {
    const { userId, friendId } = req.params;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    user.friends = user.friends.filter(id => id.toString() !== friendId);
    friend.friends = friend.friends.filter(id => id.toString() !== userId);

    await user.save();
    await friend.save();

    res.json({ message: 'Friend removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing friend', error: err });
  }
});

export default router;
