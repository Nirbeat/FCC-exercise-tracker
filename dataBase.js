const mongoose = require('mongoose');

function connectDb(){
    mongoose.connect("mongodb+srv://nirbeat:33enelRefugio@cluster0.au0dubh.mongodb.net/",{useNewUrlParser:true,useUnifiedTopology:true});
}

const UserSchema =new mongoose.Schema({

        //probar los _id predefinidos primero
        _id:{
            type : Number
        },
        username:{
            type :String,
            required :true
        }
    })
const UserModel = mongoose.model("users",UserSchema);
// const User=createUserModel();

// let newUser = new User({
//     _id: ()=>{User.count().then(count=>{return count + 1})}
// })

const ExerciseSchema= mongoose.Schema({

        _id:{
            //al agregar el ejercicio, añadir el _id del user
            type: Number,
        },
        description:{
            type :String,
            required :true
        },
        duration :{
            type : Number,
            required :true
        },
        date:{
            type : String
            //probar si esta asignacion por defecto sirve
            //default :Date(new Date().toDateString())
        }
    })
const ExerciseModel= mongoose.model("exercises", ExerciseSchema)

module.exports={ExerciseModel, UserModel, connectDb }