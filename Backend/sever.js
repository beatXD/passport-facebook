var session = require('express-session')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var passport = require('passport')
const express = require('express')
var FacebookStrategy = require('passport-facebook').Strategy
const cors = require("cors");



const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: 'http://localhost:3001',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  }));

app.use(express.static('client')); 
app.use(express.json());

const dbport = 6000;

app.listen(dbport, () => console.log(`Server started on port ${dbport}`));

var CLIENT_ID = '734439197350624'
var CLIENT_SECRET = 'b25eeef8460a1808baa969c855a39c5f'

const ngrok =  'https://44c1e46eacf5.ngrok.io'


passport.serializeUser(function(user, done) { done(null, user) })
passport.deserializeUser(function(obj, done) { done(null, obj) })

passport.use(new FacebookStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: `${ngrok}/auth/facebook/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    //ส่วนนี้จะเอาข้อมูลที่ได้จาก facebook ไปทำอะไรต่อก็ได้
    done(null, profile,)
  }
))

app.get('/logout', (req, res) => { req.logout(); res.redirect('http://localhost:3001/'); })

app.get('/', (req, res) => { res.send('please login') })

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback',passport.authenticate('facebook', { successRedirect: 'http://localhost:3001/', failureRedirect: '/' } ))

app.get('/login/success', (req, res) => { 
  if (req.user) {
    console.log(req.user)
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
})

