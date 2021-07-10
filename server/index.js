const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

app.use('/', (req, res) => {
    res.send({ message: "Hello" });
});

app.listen(PORT, () => {
    console.log(`App listening at PORT ${PORT}`);
})