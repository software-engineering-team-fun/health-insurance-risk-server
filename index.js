const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
app = express()

var url = require('url');
app.use(express.json());
app.use(
	cors({
		origin: "*",
    methods: ["GET", "POST"],
	})
)

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))
var data;

//Todo: Need to implement the math and the logic behind the BMI calculator.
//Todo: We need to find a way to get the checkbox values from client also. Maybe implement a true false dealio thing. 
//! leave post and get as they are. all we need to do is rather than return data. return whatever verdict we get for the BMI


// this takes the data from the client 
app.post('/calculate', (req, res) => {
	console.log("receiving data...")
	data = req.body;
	//data = JSON.parse(JSON.stringify(data))
	res.json(data) //displays json data in the server
})

//this sends the data back to client
//here we should send the BMI and all that. using this now to test
app.get('/calculate', (req, res)=>{
	console.log('sending data...data')
	res.send(data)
})

// Custom 404 page.
app.use((request, response) => {
	response.type('text/plain')
	response.status(404)
	response.send('404 - Not Found')
  })
  
  // Custom 500 page.
  app.use((err, request, response, next) => {
	console.error(err.message)
	response.type('text/plain')
	response.status(500)
	response.send('500 - Server Error')
  })

  app.listen(port, () => console.log(
	`Express started at \"http://localhost:${port}\"\n` +
	`press Ctrl-C to terminate.`)
  )
  