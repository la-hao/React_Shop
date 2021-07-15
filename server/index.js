import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routes/product.route.js';
import userRouter from './routes/user.route.js';

const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
);

app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send({ message: "Hello" });
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`App listening at PORT ${PORT}`);
})