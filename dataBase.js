const mongoose = require('mongoose');

function connectDb(){
    mongoose.connect("mongodb+srv://nirbeat:33enelRefugio@cluster0.au0dubh.mongodb.net/",{useNewUrlParser:true,useUnifiedTopology:true});
}

const ExerciseSchema= new mongoose.Schema({

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
    }
})

const UserSchema =new mongoose.Schema({

    //descomentar tras pasar la prueba, probar el type ObjectId
        // _id:{
        //     type : Number
        // },
        username:{
            type :String,
            required :true
        },
        log:{
            type : String,
            default :"la concha de mi vieja"
        }
    })
const UserModel = mongoose.model("users",UserSchema);

let user = new UserModel()


const ExerciseModel= mongoose.model("exercises", ExerciseSchema)

module.exports={ExerciseModel, UserModel, connectDb }