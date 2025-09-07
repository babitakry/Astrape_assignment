import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import authRoutes from './src/routes/auth.js';
import itemRoutes from './src/routes/items.js';
import cartRoutes from './src/routes/cart.js';

import connectDB from './src/database/db_connection.js';

dotenv.config();

const app = express();

app.use(cors({
   origin: [
   "http://localhost:5173",
   "https://astrape-assignment-flax.vercel.app"
   ],
   credentials: true,}
));

app.use(express.json());

connectDB();

app.get("/",(req, res)=>{
   res.send("Home page !!!!!");
})
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/cart', cartRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
