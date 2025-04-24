import { Request, Response } from 'express';
import  User  from '../models/User';
import  Thought  from '../models/Thoughts';

const userController = {
  // Get all users
  getAllUsers(req: Request, res: Response): void {
    User.find({})
      .select('-__v') // Exclude the version key
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // Get user by ID
  getUserById(req: Request, res: Response): void {
    const { id } = req.params;

    User.findOne({ _id: id })
      .populate({
        path: 'thoughts',
        select: '-__v', 
      })
      .populate({
        path: 'friends',
        select: '-__v', 
      })
      .select('-__v') 
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // Create a new user
  createUser(req: Request, res: Response): void {
    const { body } = req;

    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // Update an existing user
  updateUser(req: Request, res: Response): void {
    const { id } = req.params;
    const { body } = req;

    User.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a user and their associated thoughts
  deleteUser(req: Request<{ id: string }>, res: Response): void {
    const { id } = req.params;

    
    User.findOneAndDelete({ _id: id })
      .then((dbUserData):any => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        
        // Delete associated thoughts only if the user is found and deleted
        return Thought.deleteMany({ username: dbUserData.username }).then(() => {
          res.json({ message: 'User and associated thoughts deleted!' });
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err); 
      });
  },
  

  // Add a friend to a user's friend list
  addFriend(req: Request, res: Response): void {
    const { userId, friendId } = req.params;

    User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { friends: friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Remove a friend from a user's friend list
  removeFriend(req: Request, res: Response): void {
    const { userId, friendId } = req.params;

    User.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

export default userController;
