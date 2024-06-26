const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/dbConfig');
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const app = express();
const path = require('path');

dotenv.config();

app.set('view engine', 'ejs');
app.engine("ejs", ejsMate);

// Set views directory
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Authentication routes
app.use('/worko/users', userRoutes);

// Default route handler for root URL
app.get('/', (req, res) => {
    res.render('index');
});

module.exports = app;

// Random Page Error Handling Middle Ware ↓
app.all("*", (req, res, next) => {
    next(new ExError(404, "Page Not Found !!!"));
});

// Wrong Data Insert Error Handling Middle Ware ↓
app.use((err, req, res, next) => {
    console.log(err);
    let { statusCode = 500, message = "Message Not Found" } = err;
     res.status(statusCode);
    res.render('error',{message});
  
  })
