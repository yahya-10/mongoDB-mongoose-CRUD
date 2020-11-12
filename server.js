const express = require('express');
const app = express();
const connect = require('./config/connect');



//data parser
app.use(express.json())

//routes
app.use("/api/applicants", require("./routes/applicant"));

//connect the database
connect();


//start the server
const port = process.env.PORT || 4000 ;
app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`Server is on port ${port}`);
})

