const express = require('express');
const app = express();
const path = require('path');

const login = require('../Controllers/LoginController').login;

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));

// Dette er post data encoding
app.use(express.json());
app.use(express.urlencoded());

// Session opsætning
session = require('express-session');
app.use(session({
  secret: 'ADCC58BA-6703-4795-B94D-6C562784DAEB'
  //TODO set expire
}));

app.get('/login', (req, res) => {
  res.render('login');
  res.end();
});

app.post('/auth', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const validLogin = await login(username, password);

  if(validLogin) {
   //TODO setup session
   req.session.loggedIn = true;
   req.session.username = username;
   //TODO redirect to home
    res.redirect('/home');
  }
  else {
    res.render('login', {error: 'Invalid username or password'});
  }
  res.end();
})



const portNumber = 8080;
app.listen(portNumber, () => console.log(`Server started on ${portNumber}`));