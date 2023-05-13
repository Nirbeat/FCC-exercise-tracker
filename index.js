const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});




app.get('/api/users',(req,res,next)=>{  

  res.json([/*lista de users con formato {username:username,_id:_id}*/])

})

app.get('/api/users/:id/exercises',(req,res,next)=>{

})

app.get('/api/users/:id/logs',(req,res,next)=>{

  //añadir estas peticiones opcionales

  let from= erq.query.from; //Date()
  let to= req.query.to; //Date()
  let limit=req.query.limit //number, cantidad maxima de logs a devolver


  res.json({
    /*{
  username: username,
  count: cantidad de ejercicios (number),
  _id: _id,
  log: [{
    description: string,
    duration: number,
    date: Date(),
  }]
}
 */
  })
})


app.use(bodyParser.urlencoded({extended:false}));
app.post('/api/users',(req,res,next)=>{

  let username=req.query.username;


  res.json({
    username,
    _id
  })
})

app.post('/api/users/:id/exercises',(req,res,next)=>{

  let description = req.body.description;
  let duration= req.body.duration;
  let date =req.body.date || Date();


  res.json({
    /*{
  username: username,
  description: description,
  duration: duration,
  date: date,
  _id: _id
}
 */
  })
})











const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
