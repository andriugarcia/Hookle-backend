'use strict'

const express=require('express')
const app=express()
// const user=require('./controllers/user')
var cors = require('cors');
var path = require('path');
// const auth=require('./middlewares/auth')
var logger = require('morgan');
var bodyParser = require('body-parser');

var neo4j = require('neo4j-driver');
const axios = require('axios');
const cheerio = require('cheerio');

const filterQuery=require('./services/filterQuery')
const service=require('./services')
const queries=require('./queries');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'A4sJ2eG4aM4s'));
var driver = neo4j.driver('bolt://18.203.12.204', neo4j.auth.basic('neo4j', 'A4sJ2eG4aM4s'));

Object.defineProperty(Array.prototype, 'shuffle', {
  value: function () {
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
  }
});

app.get('/stack', async (req,res) => {
  try {
    let payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
    let session = driver.session();
    let user = await session.run(queries.signin, { emailParam: payload })
    const filter = filterQuery(user.records[0]._fields[0].properties.filters, user.records[0]._fields[0].properties.genre)
    console.log(filter)
    let result = await session.run(queries.stackRating(filter), { emailParam: payload })
    let populars = await session.run(queries.popularsRating(filter), { emailParam: payload })
    let random = await session.run(queries.random(filter))
    session.close()
    console.log(result.records)
  
    let nodes = [
      ...result.records.map(record => (record._fields[0].properties)),
      ...populars.records.map(record => (record._fields[0].properties)),
      ...random.records.map(record => (record._fields[0].properties))
    ].shuffle()
    res.status(201).send(nodes)
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
});

app.get('/', async (req,res) => {
  try {
    let session = driver.session();
    await session.run(`MATCH (u: User{ email: $emailParam })
                      MATCH (c: Clothing{ code: $clothingParam })
                      CREATE (u)-[r:LIKES {rating: $rate}]->(c)`, {
      emailParam: "u1@gmail.com",
      clothingParam: "B079RST3NH",
      rate: neo4j.int(Math.round(Math.random() * 10))
    })
    await session.run(`MATCH (u: User{ email: $emailParam })
                      MATCH (c: Clothing{ code: $clothingParam })
                      CREATE (u)-[r:LIKES {rating: $rate}]->(c)`, {
      emailParam: "u1@gmail.com",
      clothingParam: "B086882SNQ",
      rate: neo4j.int(Math.round(Math.random() * 10))
    })
    await session.run(`MATCH (u: User{ email: $emailParam })
                      MATCH (c: Clothing{ code: $clothingParam })
                      CREATE (u)-[r:LIKES {rating: $rate}]->(c)`, {
      emailParam: "u1@gmail.com",
      clothingParam: "B07XJ8RVXT",
      rate: neo4j.int(Math.round(Math.random() * 10))
    })
    await session.run(`MATCH (u: User{ email: $emailParam })
                      MATCH (c: Clothing{ code: $clothingParam })
                      CREATE (u)-[r:LIKES {rating: $rate}]->(c)`, {
      emailParam: "u1@gmail.com",
      clothingParam: "B07K2N2163",
      rate: neo4j.int(Math.round(Math.random() * 10))
    })
    await session.run(`MATCH (u: User{ email: $emailParam })
                      MATCH (c: Clothing{ code: $clothingParam })
                      CREATE (u)-[r:LIKES {rating: $rate}]->(c)`, {
      emailParam: "u1@gmail.com",
      clothingParam: "B072JGS75F",
      rate: neo4j.int(Math.round(Math.random() * 10))
    })
    await session.run(`MATCH (u: User{ email: $emailParam })
                      MATCH (c: Clothing{ code: $clothingParam })
                      CREATE (u)-[r:LIKES {rating: $rate}]->(c)`, {
      emailParam: "u1@gmail.com",
      clothingParam: "B07SND6DCH",
      rate: neo4j.int(Math.round(Math.random() * 10))
    })
    await session.run(`MATCH (u: User{ email: $emailParam })
                      MATCH (c: Clothing{ code: $clothingParam })
                      CREATE (u)-[r:LIKES {rating: $rate}]->(c)`, {
      emailParam: "u1@gmail.com",
      clothingParam: "B085RSDLN1",
      rate: neo4j.int(Math.round(Math.random() * 10))
    })
    await session.run(`MATCH (u: User{ email: $emailParam })
                      MATCH (c: Clothing{ code: $clothingParam })
                      CREATE (u)-[r:LIKES {rating: $rate}]->(c)`, {
      emailParam: "u1@gmail.com",
      clothingParam: "B07Y5BVWP3",
      rate: neo4j.int(Math.round(Math.random() * 10))
    })
    await session.run(`MATCH (u: User{ email: $emailParam })
                      MATCH (c: Clothing{ code: $clothingParam })
                      CREATE (u)-[r:LIKES {rating: $rate}]->(c)`, {
      emailParam: "u1@gmail.com",
      clothingParam: "B07V8HBVBT",
      rate: neo4j.int(Math.round(Math.random() * 10))
    })

    session.close()  
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
});

app.get('/populars', async (req,res) => {
  try {
    let payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
    let session = driver.session();

    let user = await session.run(queries.signin, { emailParam: payload })
    const filter = filterQuery(user.records[0]._fields[0].properties.filters, user.records[0]._fields[0].properties.genre)

    let result = await session.run(queries.popularsRating(filter), { emailParam: payload })
    session.close()
  
    let nodes = result.records.map(record => (record._fields[0].properties))
    res.status(201).send(nodes)
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
});

// app.get('/stack', async (req,res) => {
//   console.log("1")
//   try {
//     let payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
//     console.log("2", payload)
//     let session1 = driver.session();
//     let result = await session1.run(queries.stack, { emailParam: payload })
//     session1.close()
    
    
//     let session2 = driver.session();
//     let random = await session2.run(queries.random) // Prendas todavía sin descubrir
//     session2.close()
    
//     let nodes = result.records.map(record => (record._fields[0].properties))
//     let randomnodes = random.records.map(record => (record._fields[0].properties))
//     const length = nodes.length;
    
//     if (length < 20) {
//       const limit = 20 - length
//       let session3 = driver.session();
//       let popularResult = await session3.run(queries.populars, {
//         limit: neo4j.int(limit),
//         emailParam: payload
//       })
//       session3.close()
//       console.log(nodes.length, randomnodes.length, popularResult.records.length)
//       nodes = [
//         ...nodes,
//         ...randomnodes,
//         ...popularResult.records.map(popularRecord => (popularRecord._fields[0].properties))
//       ]
//       res.status(201).send(nodes)
//     }
//     else {
//       console.log("No mix", length)
//       console.log(nodes.length, randomnodes.length, 'No populars')          
//       res.status(200).send([...nodes, ...randomnodes])
//     }

//   }
//   catch(err) {
//     console.error(err);
//     res.sendStatus(401);
//   }
// })


app.post('/signup', async (req, res) => {
  const user={
    email: req.body.email,
    password: req.body.password
  }

  let session = driver.session();
  await session.run(queries.signup, {
    emailParam: user.email,
    passParam: user.password
  })
  session.close()
      
  res.status(200).send({
    message: 'User created',
    token: service.createToken(user),
  })
})

app.post('/signin', async (req, res) => {
  let session = driver.session();
  const result = await session.run(queries.signin, { emailParam: req.body.email })
  session.close()

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

app.get('/historial/:type', async (req, res) => {
  try {
    const payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
    console.log(payload)
    let session = driver.session();

    let result;
    switch (req.params.type) {
      case 'historicalAsc':
        result = await session.run(queries.historicalAsc, { emailParam: payload })
        break;
      case 'ratingAsc':
        result = await session.run(queries.ratingAsc, { emailParam: payload })
        break;
      case 'ratingDesc':
        result = await session.run(queries.ratingDesc, { emailParam: payload })
        break;
      default:
        result = await session.run(queries.historicalDesc, { emailParam: payload })
        break;
    }
    session.close()
    let nodes = result.records.map(record => (record._fields[0].properties))
    res.send(nodes);


  } catch(err) {
    console.error(err);
    res.send(401);
  }
})

app.get('/likes', async (req, res) => {
  try {
    const payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
    console.log(payload)
    let session = driver.session();
    const result = await session.run(queries.likesRating, { emailParam: payload })
    session.close()
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
      let session = driver.session();
      const result = await session.run(queries.dislikesRating, { emailParam: payload })
      session.close()
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
      let session = driver.session();
      const result = await session.run(queries.favorites, { emailParam: payload })
      session.close()
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
    let session = driver.session();
    const result = await session.run(queries.bought, { emailParam: payload })      
    session.close()
    let nodes = result.records.map(record => (record._fields[0].properties))
    res.send(nodes);
  } catch(err){
    console.error(err);
    res.send(401);
  }
})

app.get('/getMe', async (req, res) => {
  try {
    const payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
    console.log(payload)
    let session = driver.session();
    let result = await session.run(queries.signin, {
      emailParam: payload
    })      
    session.close()
    res.send(result.records[0]._fields[0].properties);
          
  } catch(err) {
    console.error(err);
    res.send(401);
  }
})

app.post('/vote', async (req, res) => {
  try {
    const payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
    console.log(payload)
    let session = driver.session();
    await session.run(queries.vote, {
      emailParam: payload,
      clothingParam: req.body.clothing,
      ratingParam: req.body.rating
    })      
    session.close()
    console.log("Relacionado exitosamente")
    res.sendStatus(200);
          
  } catch(err) {
    console.error(err);
    res.send(401);
  }
})

app.post('/like', async (req, res) => {
  try {
    const payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
    console.log(payload)
    let session = driver.session();
    await session.run(queries.like, {
      emailParam: payload,
      clothingParam: req.body.clothing
    })      
    session.close()
    console.log("Relacionado exitosamente")
    res.sendStatus(200);
          
  } catch(err) {
    console.error(err);
    res.send(401);
  }
})

app.post('/updateFilters', async (req, res) => {
  try {
    const payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
    console.log(payload)
    let session = driver.session();
    await session.run(queries.updateFilters, {
      emailParam: payload,
      filtersParam: req.body.filters
    })
    session.close()
    console.log("Actualizado exitosamente")
    res.sendStatus(200);
  } catch(err) {
    console.error(err);
    res.send(401);
  }
})

app.post('/updateGenre', async (req, res) => {
  try {
    const payload = await service.decodeToken(req.headers.authorization.split(" ")[1])
    console.log(payload)
    let session = driver.session();
    await session.run(queries.updateGenre, {
      emailParam: payload,
      genreParam: req.body.genre
    })
    session.close()
    console.log("Actualizado exitosamente")
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
    let session = driver.session();
    await session.run(queries.dislike, {
      emailParam: payload,
      clothingParam: req.body.clothing
    })
    session.close()
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
      let session = driver.session();
      await session.run(queries.favorite, {
        emailParam: payload,
        clothingParam: req.body.clothing
      })
      session.close()
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
      let session = driver.session();
      await session.run(queries.buy, {
        emailParam: payload,
        clothingParam: req.body.clothing
      })      
      session.close()
      console.log("Relacionado exitosamente")
      res.sendStatus(200);
  } catch(err) {
    console.error(err);
    res.send(401);
  }
})

app.get('/product/:code', async (req, res) => {
  // try {
    const url = `http://www.amazon.es/dp/${req.params.code}`;

    const {
      data
    } = await axios.get(url);

    // Price
    const $ = cheerio.load(data);
    const price = $('#priceblock_ourprice').get([0]);

    // Description
    let featureDetails = [];
    $('#feature-bullets>ul>li>span').each((i, el) => {
      featureDetails.push($(el).text().replace(/[\n\t]/g, '').trim());
    })
    let description = featureDetails.join('\n')

    // Image
    const images = $('#landingImage ').attr('data-old-hires');
    let details = {
      price: price.children[0].data,
      pictures: [images],
      description
    }
    console.log(details)
    res.send(details)

  // } catch (err) {
  //   console.error(err);
  //   res.sendStatus(404);
  // }
})
let port = process.env.PORT || 3010;
app.listen(port);
console.log('Server Started at Port ' + port);

module.exports = app;