'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/employeedb',{
    useNewUrlParser: true,useUnifiedTopology: true
})
.then(() => {
    console.log('connected to database');
})
.catch((error) => {
    console.error(error);
    process.exit();
});