const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

function connectDb(){
    mongoose.connect("mongodb+srv://nirbeat:33enelRefugio@cluster0.au0dubh.mongodb.net/",{useNewUrlParser:true,useUnifiedTopology:true});
}

const ExerciseSchema= new mongoose.Schema({

    // userId:{
    //     type : new ObjectId(),
    //     required :true
    // },

    description:{
        type :String,
        required :true
    },
    duration :{
        type : Number,
        required :true
    },
    date:{
        type : Date
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
            type: [ExerciseSchema],
        }
    })


const query = new mongoose.Query();
const UserModel = mongoose.model("users",UserSchema);
const ExerciseModel= mongoose.model("exercises", ExerciseSchema)


function getId(string){
    return new ObjectId(string)
}


module.exports={ExerciseModel, UserModel, connectDb, getId }