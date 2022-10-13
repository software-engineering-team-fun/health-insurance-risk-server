const express = require('express')
app = express()

var url = require('url');
app.use(express.json());
const cors = require('cors')
app.use(
	cors({
		origin: "*",
    methods: ["GET", "POST"],
	})
)

const port = process.env.PORT || 3000

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))
let bmi;

app.get('/send', (req, res) => { 	// localhost:3000/send for local testing, https://health-insurance-risk-server.azurewebsites.net/send for azure server -am
	var inputs = url.parse(req.url, true).query
	const age = parseInt(inputs.patAge)
	const height = parseInt(inputs.patHeight)
	const weight = parseInt(inputs.patWeight)
	const sys = parseInt(inputs.patSys)
	const dia = parseInt(inputs.patDia)
	const alzH = parse(inputs.patDiaH)
   res.send('Patient Age ' + age + " Height: " + height + ' Weight ' + weight + " sys: " + sys + ' Dia ' + dia);

});
//from node.js azure template -am
app.get('/calculate-bmi', (request, response) => {
	console.log('Calling "/calculate-bmi" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	const heightFeet = parseInt(inputs.feet)
	const heightInches = parseInt(inputs.inches)
	const weight = parseInt(inputs.lbs)

	console.log('Height:' + heightFeet + '\'' + heightInches + '\"')
	console.log('Weight:' + weight + ' lbs.')

	// Todo: Implement unit conversions and BMI calculations.
	// Todo: Return BMI instead of Todo message.

	response.type('text/plain')
	response.send('Todo: Implement "/calculate-bmi"')
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
  