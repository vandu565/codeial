const express=require('express');
const app=express();
const port=8000;

app.listen(port,function(err){
    if(err){
       // console.log('error',err);
       console.log(`error in running port:${err}`);
    }
   // console.log('server is running on port:',port);
   console.log(`server is running on port:${port}`);
});