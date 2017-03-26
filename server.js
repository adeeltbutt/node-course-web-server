const express = require ('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs'); // this is key value pair --- key view engine and value hbs



app.use((req, res, next)=>{ // app.use only take one argument as a function
    var now = new Date().toDateString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log +'\n',(err)=>{
       if (err) console.log('unable to append to server.log'); 
    });
    next();
});

//app.use((req,res,next)=>{
//    res.render('maintain.hbs');
//});

app.use(express.static(__dirname +'/public')); // app.use is how you register middleware
hbs.registerHelper('getCurrentYear',()=>{
   
    return new Date().getFullYear(); 
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    //res.send('<h1>hello my new webserver</h1>');
//    res.send({
//       name: 'adeel',
//       lastname: 'butt'
//    });
    res.render('home.hbs',{
        message: "this is my new page",
        pageTitle: 'Home Page from server.js'
        
    });
    
});

app.get('/about',(req,res)=>{
   //res.send('About Page');
    res.render('about.hbs',{
        pageTitle: 'About Page from server.js'
    });
});

app.get('/bad',(req,res)=>{
    res.send('error occured');
});

app.listen(3000, ()=>{
    console.log('server is starting on port 3000');
});