const axios = require('axios');
const bcrypt = require('bcryptjs')
const { authenticate , jwtKey } = require('../auth/authenticate');
const Users = require('./users-model.js');
const jwt = require('jsonwebtoken');


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;
  //console.log(user)

  Users.add(user)
  .then(user => {
      const token = generateToken(user);
      res.status(201).json({user, token})
      //console.log(user, token)
  })
  .catch(error => {
    res.status(500).json({message: "Router error: ",  error})
  })
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  Users.findBy({ username })
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({message: `Welcome you funny and crazy dad ${user.username}!`, token})
    } else {
      res.status(401).json({message: "Your credential is not correct"})
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn:"1d"
  }

  return jwt.sign(payload, jwtKey, options)
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
