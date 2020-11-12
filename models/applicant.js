const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ApplicantSchema = new Schema({
    name: {
        type: String ,
        required: true
    },
    email: {
        type: String ,
        required: true
    },
    favoriteFoods: [String],
    age: String
})


module.exports = Applicant = mongoose.model('applicant', ApplicantSchema);