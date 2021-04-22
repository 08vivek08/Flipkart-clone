const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialData = require("./routes/admin/initialData");
const pageRoutes = require("./routes/admin/page");

// environment variable or contants
env.config();

// DB connections
mongoose.set('debug', true);
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.dmkfo.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch(() => {
    console.log("ERROR in DB Connection");
});

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));

// My routes
app.get('/', (req, res) => {
    let ipAddress = req.connection.remoteAddress, frwdIps;
    let frwdIpsstr = req.header('x-forwarded-for');
    if (frwdIpsstr) {
        frwdIps = frwdIpsstr.split(',');
    }
    return res.status(200).json({
        message: [ipAddress,frwdIps]
    });
});

app.post('/data', (req, res) => {
    console.log(req.body);
    return res.status(200).json({
        message: req.body
    });
});

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialData);
app.use('/api', pageRoutes);


// Starting a server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});