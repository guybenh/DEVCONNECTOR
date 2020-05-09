const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
})

app.get('/', (req, res) => res.send('API is running'));