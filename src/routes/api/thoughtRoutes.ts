import express, { Request, Response } from 'express';
import Thought from '../../models/Thoughts';
import User from '../../models/User';

const router = express.Router();


router.get('/', async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching thoughts', error: err });
  }
});


router.get('/:id', async (req: Request, res: Response):Promise<any> => {
  try {
    const thought = await Thought.findById(req.params.id).populate('reactions');

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching thought', error: err });
  }
});


router.post('/', async (req: Request, res: Response) => {
  try {
    const thought = new Thought(req.body);
    await thought.save();

    
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });

    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Error creating thought', error: err });
  }
});


router.put('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Error updating thought', error: err });
  }
});


router.delete('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting thought', error: err });
  }
});

export default router;
