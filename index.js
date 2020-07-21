const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const db=require('./config/mongoose');
// used for session cookie
const session = require('express-session');
//const passport = require('passport');
const passport = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');

const mongoStore = require('connect-mongo')(session);
const sassMidddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');



app.use(sassMidddleware({
   src:'./assets/scss',
   dest:'./assets/css',
   debug:true,
   outputStyle:'extended',
   prefix:'/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
//make upload path avilable to browser
app.use('/uploads',express.static(__dirname+'/uploads'));
//using express layouts, define before routes
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);
//extract style ans scripts from sub pages into the layout
app.set('layout extractStyles' , true);

app.set('layout extractScripts', true);




//set up the view ingine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
   name: 'codeial',
   // TODO change the secret before deployment in production mode
   secret: 'blahsomething',
   saveUninitialized: false,
   resave: false,
   cookie: {
       maxAge: (1000 * 60 * 100)
   },
   store :new mongoStore({
      mongooseConnection:db,
      autoRemove:'disabled'
   },function(err){
      console.log(err || 'connect-mongodb setup ok ');
   })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//after seesion cookie
app.use(flash());
app.use(customMware.setFlash);


//use expres router
app.use('/',require('./routes/index'));




app.listen(port,function(err){
    if(err){
       // console.log('error',err);
       console.log(`error in running port:${err}`);
    }
   // console.log('server is running on port:',port);
   console.log(`server is running on port:${port}`);
});