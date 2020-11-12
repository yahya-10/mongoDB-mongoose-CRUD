const express = require('express');
const router = express.Router();
const Applicant = require('../models/applicant')


//@ Route POST api/applicants
//@ Description Create/Add applicant
//@ Public

router.post('/', (req, res) => {
    const newApplicant = new Applicant({...req.body});
    newApplicant
    .save()
    .then(applicant => res.send(applicant))
    .catch(err =>res.send(err))
})

//@ Route POST api/applicants
//@ Description Create/Add many applicants
//@ Public
router.post('/manyApplicants', (req, res) =>{
    let info = req.body
    Applicant.create(info)
        .then(applicants => res.send(applicants))
        .catch(err => console.log(err))
})

//@ Route GET api/applicants
//@ Description get all applicants
//@ Public
router.get('/', (req, res) => {
    Applicant.find()
    .then(applicants => res.send(applicants))
    .catch(err => res.send(err))
})

//@ Route GET api/applicants
//@ Description get applicants by name
//@ Public
router.get('/:name', (req, res) => {
    Applicant.find({name: req.params.name})
    .then(applicant => res.send(applicant))
    .catch(err =>res.send(err))
})

//@ Route GET api/applicants
//@ Description get applicants by matching document
//@ Public
router.get('/favoriteFoods/:favoriteFoods', (req, res) => {
    Applicant.find({favoriteFoods: req.params.favoriteFoods})
    .then(applicant => res.send(applicant))
    .catch(err =>res.send(err))
})

//@ Route GET api/applicants
//@ Description get applicant by id
//@ Public
router.get('/id/:id', (req, res) => {
    Applicant.findById(req.params.id)
    .then(applicant => res.send(applicant))
    .catch(err =>res.send(err))
})

//@ Route GET, PUT api/applicants
//@ Description Perform Classic Updates by Running Find, Edit, then Save
//@ Public
router.put('/findAndUpdate/:id', (req, res) => {
    Applicant.findById(req.params.id) 
        .then(applicant => {
            applicant.favoriteFoods.push(req.body.favoriteFoods)
            applicant.save()
            .then(applicant => res.send(applicant))
            .catch(err =>res.send(err))
        }
            )
        .catch(err => res.send(err))
})

//@ Route PUT api/applicants
//@ Description new updates
//@ Public
router.put('/findOneAndUpdate/:name', (req, res) => {
    Applicant.findOneAndUpdate({name: req.params.name},
        {$set: {age: req.body.age}})
    .then(applicant => res.send(applicant))
    .catch(err => res.send(err))
})

//@ Route DELETE api/applicants
//@ Description remove applicants by id
//@ Public
router.delete('/findByIdAndRemove/:_id', (req, res) =>{
    Applicant.findByIdAndRemove(req.params.id)
    .then(() => res.send("Applicant with ID: " +req.params.id+ " has been deleted From Collection" ))
    .catch(err => console.error(err))
})

//@ Route DELETE api/applicants
//@ Description remove many documents
//@ Public
router.delete('/Remove/:name', (req, res) => {
    Applicant.remove({ name: req.params.name })
        .then(applicant => res.send({NumberOfApplicantsDeleted: applicant.deletedCount}))
        .catch(err => res.send(err))
    
})

//@ Route GET api/applicants
//@ Description chain search query helpers
//@ Public
router.get('/chainSearchQuery/:food', (req, res) => {
    Applicant.find({favoriteFoods : req.params.food})                  
    .sort({name: 1})         
    .limit(2)                
    .select({age: false} )
    .exec((err, users)  => {
        if(err ) console.log(err)
        else res.send(users)
       
    })    
    })



module.exports = router 