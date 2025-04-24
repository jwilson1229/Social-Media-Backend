import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/api/userRoutes';
import thoughtRoutes from './routes/api/thoughtRoutes';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Direct test route in server.ts
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'API is healthy' });
});

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Apply routes after successful DB connection
    app.use('/api/users', userRoutes);
    app.use('/api/thoughts', thoughtRoutes);

    // Add another test route
    app.get('/api/test', (req: Request, res: Response) => {
      res.json({ message: 'API test route working!' });
    });

    // Catch-all for undefined routes
    app.use((req: Request, res: Response) => {
      res.status(404).send('Route not found');
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  })
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
  });


// Error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});
