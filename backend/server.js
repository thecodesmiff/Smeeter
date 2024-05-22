import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import smeetRoutes from './routes/smeet.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();
const PORT = process.env.PORT || 8001;

dotenv.config();


app.get('/', (req, res) => {
    res.send("what up?!")
})

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/smeets', smeetRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));