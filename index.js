import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
dotenv.config();

// mongoose
//   .connect("mongodb://localhost:27017/Blog")
//   .then(() => {
//     console.log('MongoDb is connected');
//   })
//   .catch((err) => {
//     console.log(err);
//   });


const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};

connectToDatabase();

const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const PORT = 4100;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
