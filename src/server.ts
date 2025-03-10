import express from 'express';
import cors from 'cors';
import db from './config/connection';
import userRoutes from './routes/api/userRoutes';
import friendRoutes from './routes/api/friendsRoutes';
import thoughtRoutes from './routes/api/thoughtRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());


app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.get("/", (req,res) => {
    res.send("API is up and running");
});

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
});
