import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Thought from '../models/Thoughts';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/socialDB';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    seedData();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const seedData = async (): Promise<void> => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = await User.insertMany([
      {
        username: 'johnDoe',
        email: 'john@example.com',
        friends: [],
      },
      {
        username: 'janeSmith',
        email: 'jane@example.com',
        friends: [],
      },
      {
        username: 'mikeTyson',
        email: 'mike@example.com',
        friends: [],
      },
      {
        username: 'sarahConnor',
        email: 'sarah@example.com',
        friends: [],
      }
    ]);

    const thoughts = await Thought.insertMany([
      {
        thoughtText: 'I love coding!',
        username: 'johnDoe',
        reactions: [
          { reactionBody: 'Me too!', username: 'janeSmith' },
        ],
      },
      {
        thoughtText: 'MongoDB is awesome!',
        username: 'mikeTyson',
        reactions: [
          { reactionBody: 'Totally agree!', username: 'johnDoe' },
        ],
      },
      {
        thoughtText: 'TypeScript makes everything better!',
        username: 'sarahConnor',
        reactions: [
          { reactionBody: 'Absolutely!', username: 'mikeTyson' },
        ],
      }
    ]);

  
    await User.findOneAndUpdate(
      { username: 'johnDoe' },
      { $push: { friends: users.find(u => u.username === 'janeSmith')?._id } }
    );

    await User.findOneAndUpdate(
      { username: 'mikeTyson' },
      { $push: { friends: users.find(u => u.username === 'sarahConnor')?._id } }
    );

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};
