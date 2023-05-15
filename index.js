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

app.post('/api/users/:_id/exercises', (req, res, next) => {

  let description = req.body.description;
  let duration = parseInt(req.body.duration);
  let date = new Date(req.body.date || Date());
  let id = DB.getId(req.params._id)

  DB.UserModel.findById(id)
    .then(user => {

      let exArr=user.log;
      let newExercise = new DB.ExerciseModel({
              description : description,
              duration : duration,
              date : date
      })
      exArr.push(newExercise);
      user.updateOne(user, {log:exArr});
      user.save();
      res.json({
              _id : user._id,
              username : user.username,
              date : newExercise.date.toDateString(),
              duration : newExercise.duration,
              description : newExercise.description
            })
    })

  // DB.UserModel.findOne({_id : req.params.id})
  //   .then(user=>{
  //   let newExercise = new DB.ExerciseModel({
  //     userId : user._id,
  //     description : req.body.description,
  //     duration : req.body.duration,
  //     date : req.body.date || new Date(Date()).toDateString()
  //   })

  //   newExercise.save().then(exercise=>{

  //     res.json({
  //       _id : user.userId,
  //       username : user.username,
  //       date : exercise.date,
  //       duration : exercise.duration,
  //       description : exercise.description
  //     })
  //   })


  // })
})











const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
