const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
var mongoose = require("mongoose");

// routes
const authRoutes = require("./routes/auth"); 
const adminRoutes = require("./routes/admin/auth"); 


// environment variable or contants
env.config();

// DB connections
mongoose.set('debug', true);
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch(() => {
    console.log("ERROR in DB Connection");
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);



// My routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello from server'
    });
});

app.post('/data', (req, res) => {
    res.status(200).json({
        message: req.body
    });
    console.log(req.body);
});

// Starting a server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});