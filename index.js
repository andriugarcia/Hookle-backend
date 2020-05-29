'use strict'

const users = require('./users.json')
const clothes = require('./clothes.json')

const express=require('express')
const app=express()
// const user=require('./controllers/user')
var cors = require('cors');
var path = require('path');
// const auth=require('./middlewares/auth')
var logger = require('morgan');
var bodyParser = require('body-parser');

var neo4j = require('neo4j-driver');

const service=require('./services')
const queries=require('./queries');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'A4sJ2eG4aM4s'));
var session = driver.session();

app.get('/stack', async (req,res) => {
  try {
    let payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
    let result = await session.run(queries.stack, { emailParam: payload })
    
    if (result.records.length == 0) return res.sendStatus(401);
    let nodes = result.records.map(record => (record._fields[0].properties))
    console.log(payload);
    const length = nodes.length;

    if (length < 20) {
      console.log("Mixing with populars", length)
      const limit = 20 - length
      console.log("LIMIT: ", limit)
      let popularResult = await session.run(queries.populars, {
        limit: neo4j.int(limit),
        emailParam: payload
      })
      nodes = [
        ...nodes,
        ...popularResult.records.map(popularRecord => (popularRecord._fields[0].properties))
      ]
      console.log(nodes)          
      res.status(201).send(nodes)
    }
    else {
      console.log("No mix", length)
      console.log(nodes)          
      res.status(200).send(nodes)
    }

  }
  catch(err) {
    console.error(err);
    res.sendStatus(401);
  }
})
    
app.post('/signup', async (req, res) => {
  const user={
    email: req.body.email,
    password: req.body.password
  }
  
  await session.run(queries.signup, {
        emailParam: user.email,
        passParam: user.password
      })
      
  res.status(200).send({
    message: 'User created',
    token: service.createToken(user)
  })
})

app.post('/signin', async (req, res) => {
  const result = await session.run(queries.signin, { emailParam: req.body.email })
  if (result.records.length == 0) {
    res.sendStatus(404);
    return;
  }
  let user = result.records[0]._fields[0].properties
  console.log(user)

  if (user.password == req.body.password) {
    res.status(201).send({
        message:'Login correcto',
        token: service.createToken(user)
    })
  }
  else {
    res.status(400).send({
      message: 'La contraseña no es correcta'
    })
  }
})

app.get('/likes', async (req, res) => {
  try {
    const payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
    console.log(payload)
    const result = await session.run(queries.likes, { emailParam: payload })
    let nodes = result.records.map(record => (record._fields[0].properties))
    res.send(nodes);
  } catch(err) {
    console.error(err);
    res.send(401);
  }
})

app.get('/dislikes', async (req, res) => {
  try {
    const payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
      console.log(payload)
      const result = await session.run(queries.dislikes, { emailParam: payload })
      let nodes = result.records.map(record => (record._fields[0].properties))
      res.send(nodes);            
  }
  catch(err) {
    console.error(err);
    res.send(401, err);
  }
})

app.get('/favorites', async (req, res) => {
  try {
    const payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
      console.log(payload)
      const result = await session.run(queries.favorites, { emailParam: payload })
      let nodes = result.records.map(record => (record._fields[0].properties))
      res.send(nodes);
            
  } catch(err) {
    console.error(err);
    res.send(401);
  }
})

app.get('/bought', async (req, res) => {
  try {
    const payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
    console.log(payload)
    const result = await session.run(queries.bought, { emailParam: payload })      
    let nodes = result.records.map(record => (record._fields[0].properties))
    res.send(nodes);
  } catch(err){
    console.error(err);
    res.send(401);
  }
})

app.post('/like', async (req, res) => {
  try {
    const payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
    console.log(payload)
    await session.run(queries.like, {
                emailParam: payload,
                clothingParam: req.body.clothing
              })      
    console.log("Relacionado exitosamente")
    res.sendStatus(200);
          
  } catch(err) {
    console.error(err);
    res.send(401);
  }
})


app.post('/dislike', async (req, res) => {
  try {
    const payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
    console.log(payload)
    await session.run(queries.dislike, {
                emailParam: payload,
                clothingParam: req.body.clothing
              })
    console.log("Relacionado exitosamente")
    res.sendStatus(200);
  } catch(err) {
    console.error(err);
    res.send(401);
  }
})

app.post('/fav', async (req, res) => {
  try {
    const payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
      console.log(payload)
      await session.run(queries.favorite, {
                  emailParam: payload,
                  clothingParam: req.body.clothing
                })
      console.log("Relacionado exitosamente")
      res.sendStatus(200);

  } catch(err) {
    console.error(err);
    res.send(401);
  }
})

app.post('/buy', async (req, res) => {
  try {
    const payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
      console.log(payload)
      await session.run(queries.buy, {
                  emailParam: payload,
                  clothingParam: req.body.clothing
                })      
      console.log("Relacionado exitosamente")
      res.sendStatus(200);
  } catch(err) {
    console.error(err);
    res.send(401);
  }
})

app.listen(3010);
console.log('Server Started at Port 3010');

module.exports = app;