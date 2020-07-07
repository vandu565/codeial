const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const db=require('./config/mongoose');


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
//using express layouts, define before routes
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);
//extract style ans scripts from sub pages into th layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);


//use expres router
app.use('/',require('./routes/index'));
//set up the view ingine
app.set('view engine','ejs');
app.set('views','./views');



app.listen(port,function(err){
    if(err){
       // console.log('error',err);
       console.log(`error in running port:${err}`);
    }
   // console.log('server is running on port:',port);
   console.log(`server is running on port:${port}`);
});