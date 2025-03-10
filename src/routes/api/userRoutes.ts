import express, { Request, Response } from 'express';
import User from '../../models/User';
import Thought from '../../models/Thoughts';

const router = express.Router();

// GET all users
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users'});
  }
});

// GET single user by id
router.get('/:id', async (req: Request, res: Response):Promise<any> => {
  try {
    const user = await User.findById(req.params.id)
      .populate('thoughts')
      .populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user'});
  }
});

// POST a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user'});
  }
});

// PUT to update user by id
router.put('/:id', async (req: Request, res: Response):Promise<any> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user'});
  }
});

// DELETE user by id
router.delete('/:id', async (req: Request, res: Response):Promise<any> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await Thought.deleteMany({ username: user.username }); 

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user'});
  }
});

export default router;
