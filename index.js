// var mongoose = require('mongoose');
 
// mongoose.connect('mongodb://localhost:/eventdb', function (err) {
//     if (err) throw err; 
//     console.log('Successfully connected');  
//  });

//  var rsvpSchema = mongoose.Schema({
//     name: String,
//     email: String,
//     attending: Boolean,
//     noOfGuests: Number
// });

// var rsvpData = mongoose.model('Rsvp', rsvpSchema);


const express = require('express');
const mongoose = require('mongoose');
const app = express();


const port = 3000;
app.use(express.json());
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/rsvp', () => {
    console.log('database is connected...');
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
// Define a schema
var Schema = mongoose.Schema;
var responseSchema = new Schema({
    name: String,
    email: String,
    attending: Boolean,
    numGuests: {type: Number, min: 1, max: 8}
});
// Compile a Response model from the schema
var Response = mongoose.model('Response', responseSchema);

// Renders the main page with RSVP form
app.get('/', function (req, res) {
    res.render('main.pug', {title: 'Event RSVP'});
})

app.post('/reply', function (req, res, next) {
    // Create an instance of Response model
    var response = new Response({
        name: req.body.name,
        email: req.body.email,
        attending: req.body.attending,
        numGuests: req.body.numGuests
    });
    // Save to database
    response.save()
        .then(rsvp => {
            console.log('rsvp saved to the database');
            res.render('reply.pug', {title: 'Event RSVP'});
        })
        .catch(err => {
           console.log('Unable to save to database'); 
        });
})

app.get('/guests', function (req, res) {
    
    let attendingArray ;
     Response.find({attending: true},function(err, attending) {
        if (err){ res.send(err);}
            
        console.log("attending----",attending);
        res.render('guestlist.pug', {title: 'Guest List', arrayOfAttending: attending});   
    });
    // let notAttendingArray = Response.find({'attending': false},function(err, notAttending) {
    //         if (err)
    //             res.send(err);
    //             return notAttending;
    // })
    // console.log("hello",attendingArray);
    // res.render('guestlist.pug', {title: 'Guest List', arrayOfAttending: attendingArray, arrayOfNotAttending: notAttendingArray});   
   
});

    // var attendingQuery = Response.find({'attending': true});
    // var notAttendingQuery = Response.find({'attending': false});
    // res.render('guestlist.pug', {title: 'Guest List', arrayOfAttending: attendingQuery, arrayOfNotAttending: notAttendingQuery});
//})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

