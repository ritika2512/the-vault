const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/user');

env.config();
app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.MDB_USERNAME}:${process.env.MDB_PASSWORD}@cluster0.kst6a.mongodb.net/${process.env.MDB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(()=>{
    console.log('database connected');
});

app.use('/api',userRoutes);



app.listen(process.env.PORT, ()=>{
    console.log(`server is listening on port ${process.env.PORT}`);
});
