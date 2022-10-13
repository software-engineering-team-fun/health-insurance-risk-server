const express = require('express')
app = express()

app.use(express.json());

const cors = require('cors')
app.use(
	cors({
		origin: "*",
    methods: ["GET", "POST"],
	})
)

let bmi;

//from node.js azure template
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
app.post('https://health-insurance-risk-server.azurewebsites.net/send', (req, res) => {
   let age =  req.body.patAge;
   let height = req.body.patHeight;
   let weight = req.body.patWeight;
   //let bmi = calcBMI();
   let sys = req.body.patSys;
   let dia = req.body.patDia;
   let diaH = req.body.patDiaH;
   let cancerH = req.body.patCancerH;
   let AlzH = req.body.patAlzH;
   res.send( age, height,weight,sys,diaH,cancerH,AlzH);

});
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
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))