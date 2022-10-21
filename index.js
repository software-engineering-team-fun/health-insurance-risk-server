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
function calculate(){
	var age = data.age;
	var height = data.height;
	var weight = data. weight;
	var systolic = data.systolic;
	var diastolic = data.diastolic;
	var diabetes = data.diabetes;
	var cancer = data.cancer;
	var alzheimers = data.alzheimers
	var bmi;
	var risk_num = 0;
	var risk;
	if (age < 30) {
	} else {
		if (age <45) {
			risk_num += 10
		} else {
			if (age<60) {
				risk_num += 20
			} else {
				risk_num += 30
	}	
	}
	}

	height = height/39.37;
	weight = weight/2.205;
	bmi= weight/(height * height);
	
	if (bmi >= 18.5 && bmi <= 24.9) {
		
	} else {
		if (bmi >=25 && bmi <= 29.9) {
			risk_num += 30;
			} else {
				risk_num += 75;
			}
	}
	
	if (systolic < 120 && diastolic < 80) {
		
	} else {
		if ((systolic >= 120 && systolic < 130) && (diastolic < 80)) {
			risk_num += 15;
		} else {
			if ((systolic >= 130 && systolic < 140)||(diastolic>= 80 && diastolic < 90)) {
				risk_num += 30;
			} else {
				if ((systolic >= 140 && systolic < 180) || (diastolic >= 90 && diastolic < 120)) {
					risk_num += 75;
				} else {
					if (systolic >= 180 || diastolic >= 120) {
						risk_num += 100;
					} else {
						
					}
				}
			}
		}
	}

	if (diabetes == true) {
		risk_num += 10;
	}
	if (cancer == true) {
		risk_num += 10;
	}
	if (alzheimers == true) {
		risk_num += 10;
	}

	if (risk_num <= 20) {
		risk = "Low Risk";
	} else {
		if (risk_num <= 50) {
			risk = "Moderate Risk";
		} else {
			if (risk_num <= 75) {
				risk = "High Risk";
			} else {
				risk = "Uninsurable";
			}
		}
	}
	risk = {"risk": risk, "risk_num": risk_num}
	return JSON.stringify(risk)
}

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
	var end_risk = calculate()
	res.send(end_risk)
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
  