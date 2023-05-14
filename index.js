const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const DB = require('./dataBase')

DB.connectDb();

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});




app.get('/api/users', (req, res, next) => {

  //recorrer la coleccion de usuarios y devolver todos

  let users = [];



  res.json([/*lista de users con formato {username:username,_id:_id}*/])

})

app.get('/api/users/:id/logs', (req, res, next) => {

  //añadir estas peticiones opcionales

  let from = req.query.from; //Date()
  let to = req.query.to; //Date()
  let limit = req.query.limit //number, cantidad maxima de logs a devolver


  res.json({
    /*{
  username: username,
  count: cantidad de ejercicios (number),
  _id: _id,
  //para el log, pushear en la busqueda de ejercicios por id
  log: [{
    description: string,
    duration: number,
    date: Date(),
  }]
}
 */
  })
})


app.use(bodyParser.urlencoded({ extended: false }));
app.post('/api/users', (req, res, next) => {

  const username = req.body.username;

  DB.UserModel.count().then(id => {
    let newUser = new DB.UserModel({
      username: username,
      _id: id
    })

    newUser.save();

    res.json({
      username : newUser.username,
      _id : newUser._id
    })
  })

  // const Model = DB.createUserSchema();
  // let username = req.body.username;

  // const User = DB.mongoose.model("users", Model);

  // User.count().then(id => {
  //   let user = new User({
  //     username: username,
  //     _id: id
  //   })

  //   user.save().then(user=>{
  //     res.json({
  //       user: user.username,
  //       _id: user._id
  //     })
  //   })
  // })



  // res.json({/*
  //   username: string,
  //   _id__id*/
  // })
})

app.post('/api/users/:id/exercises', (req, res, next) => {

  let description = req.body.description;
  let duration = req.body.duration;
  let date = req.body.date || Date();


  res.json({
    /*{
  username: string,
  description: string,
  duration: number,
  date: Date(),
  _id: _id
}
 */
  })
})











const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
