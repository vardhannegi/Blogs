const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('express/lib/response');
const blogRouters = require('./routes/blogRoutes');

const app = express();

const dbURI = '<PASTE YOUR MONGODB LINK OR CREATE DATABASE CONNECTION HERE>';

mongoose.connect(dbURI,{useNewURlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
  

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about',(req,res) => {
    res.render('about',{title:'about'});

});


app.use('/blogs',blogRouters);
// this app.use must be at the bottom coz is run for ever url request even for the valid urls too
app.use((req,res) => {
    res.status(404).render('404',{title:'404'});

});