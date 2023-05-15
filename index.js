const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const DB = require('./dataBase')
const { ObjectId } = require('mongodb')

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

  const from = new Date(req.query.from || Date());
  const to = new Date(req.query.to || Date());
  const limit = parseInt(req.query.limit) || Number.MAX_VALUE;
  const id = new ObjectId(req.params._id);


  DB.UserModel.findById(id).then(user => {
    let logs=[];

    if (from != Date()) {
      DB.ExerciseModel
        .find({ userId: id })
        .where('date').gte(from)
        .lte(to)
        .limit(limit)
        .then(exercises => {
          
          exercises.forEach(ex=>{
            logs.push({
              description : ex.description,
              duration :ex.duration,
              date : ex.date.toDateString()
            })
          })

          res.json({
            username: user.username,
            count:logs.length,
            _id: id,
            log:logs,
          })
        })
    } else {
      DB.ExerciseModel
        .find({ userId: id })
        .limit(limit)
        .then(exercises => {
          exercises.forEach(ex=>{
            logs.push({
              description : ex.description,
              duration :ex.duration,
              date : ex.date.toDateString()
            })
          })

          res.json({
            username: user.username,
            count:logs.length,
            _id: id,
            log:logs,
          })
        })
    }
  })
})


app.use(bodyParser.urlencoded({ extended: false }));

//ESTA RUTA YA PASA LAS PRUEBAS
app.post('/api/users', (req, res, next) => {

  //DESCOMENTAR TRAS PASAR LA PRUEBA O PONER CAMPO DE DNI
  const username = req.body.username;

  DB.UserModel.count().then(id => {
  let newUser = new DB.UserModel({
    username: username,
    _id: new ObjectId(id)
  })

  newUser.save();

  res.json({
    username: newUser.username,
    _id: newUser._id
  })
})
})

//NO PASA LAS PRUEBAS, PERO FUNCIONA PERFECTO, FCC PARECE NO PODER PONER EL ID PARA LA BUSQUEDA
app.post('/api/users/:_id/exercises', (req, res, next) => {

  let description = req.body.description;
  let duration = parseInt(req.body.duration);
  let date = new Date(req.body.date || Date());
  let id = DB.getId(req.params._id)

  DB.UserModel.findOne({ _id: id })
    .then(user => {

      let newExercise = new DB.ExerciseModel({
        userId: id,
        description: description,
        duration: duration,
        date: date
      })

      newExercise.save();
      
      res.json({
        _id: newExercise.userId,
        username: user.username,
        date: newExercise.date.toDateString(),
        duration: newExercise.duration,
        description: newExercise.description
      })

    })
})











const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
