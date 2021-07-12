import express from 'express';
import data from './data.js';
import cors from 'cors';
import productRouter from './routes/product.route.js';

const app = express();

app.use(cors());

app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send({ message: "Hello" });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`App listening at PORT ${PORT}`);
})