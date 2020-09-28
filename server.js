const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect Database
connectDB();

//Port - first look for an enviroment port (when connect to heroku)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
})

app.get('/', (req, res) => res.send('API is running'));

//Init MiddleWare -allows to get the data from req.body
app.use(express.json({ extended: false }));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));