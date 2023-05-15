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



//YA PASA LAS PRUEBAS
app.get('/api/users', (req, res, next) => {

  DB.UserModel.find().then(users => {
    let usersArr = [];

    users.forEach(user => {
      usersArr.push({
        _id: user._id,
        username: user.username
      })
    });
    res.json(usersArr)

  })

})

app.get('/api/users/:_id/logs', (req, res, next) => {

  //añadir estas peticiones opcionales
  //ojo que el query solo anda para querys no declaradas, en ese  aso se usa params
  let from = Date.parse(req.query.from || Date()); //Date()
  let to = Date.parse(req.query.to || Date()); //Date()
  let limit = parseInt(req.query.limit) || null //number, cantidad maxima de logs a devolver

  const id = req.params._id

  DB.UserModel.findById(DB.getId(id)).then(user => {


    //comprobador de from y to funcionando, revisar los signos
    //probar volver a la tabla de ejercicios para hacer las busquedas
    let exerciseAfter = user.log.filter(ex => Date.parse(ex.date) <= from);
    let exerciseBefore = user.log.filter(ex => Date.parse(ex.date) >= to);


    //ESTO YA ANDA
    // res.json({
    //   username: user.username,
    //   count: user.log.length,
    //   _id: user._id,
    //   log: user.log
    // })
  })
})


app.use(bodyParser.urlencoded({ extended: false }));

//ESTA RUTA YA PASA LAS PRUEBAS
app.post('/api/users', (req, res, next) => {

  //DESCOMENTAR TRAS PASAR LA PRUEBA O PONER CAMPO DE DNI
  const username = req.body.username;

  // DB.UserModel.count().then(id => {
  let newUser = new DB.UserModel({
    username: username,
    // _id: id
  })

  newUser.save();

  res.json({
    username: newUser.username,
    _id: newUser._id
  })
})
// })

//NO PASA LAS PRUEBAS, PERO FUNCIONA PERFECTO, FCC PARECE NO PODER PONER EL ID PARA LA BUSQUEDA
app.post('/api/users/:_id/exercises', (req, res, next) => {

  let description = req.body.description;
  let duration = parseInt(req.body.duration);
  let date = new Date(req.body.date || Date());
  let id = DB.getId(req.params._id)

  DB.UserModel.findOne({ _id: id })
    .then(user => {
      let username = user.username;
      console.log(user)
      let newExercise = new DB.ExerciseModel({
        _id: id,
        description: description,
        duration: duration,
        date: date
      })

      newExercise.save();

      res.json({
        _id: id,
        username: username,
        date: date.toDateString(),
        duration: duration,
        description: description
      })

    })
})











const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
