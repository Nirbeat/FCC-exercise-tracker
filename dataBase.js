const mongoose = require('mongoose');

function connectDb(){
    mongoose.connect("",{});
}

module.exports = {connectDb}