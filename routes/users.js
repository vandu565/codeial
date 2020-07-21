const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_controller');
const passport = require('passport');


//router.get('/profile',usersController.profile);
//router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);


router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
//adding signup form 
//router.post('/create',usersController.create);
router.post('/create', usersController.create);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', 
{failureRedirect: '/users/sign-in'}), usersController.createSession);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);


module.exports=router;

