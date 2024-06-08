const express = require('express');
const usersRouter = require('./routes/users');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});
