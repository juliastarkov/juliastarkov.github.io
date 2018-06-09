const express    = require('express'),
	  app        = express(),
	  nodemailer = require('nodemailer'),
	  mg         = require('nodemailer-mailgun-transport'),
	  bodyParser = require('body-parser'),
	  dotENV     = require('dotenv').load(),
	  auth       = {"auth": {"api_key" : process.env.API_KEY, "domain" : process.env.DOMAIN}};
        			
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/julia", (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const message = req.body.message;

	// create transporter object capable of sending email using the default SMTP transport
	const transporter = nodemailer.createTransport(mg(auth));

	const mailOptions = {
		from: email,
		name: name,
		to: 'jstarkov8@gmail.com', 
		subject: 'New Message From Your Portfolio Contact Page',
		text: message
	};
	
	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			// Simple log to server, add proper UI response to user at res.
			// or add flash message to page with https://www.npmjs.com/package/connect-flash 
	  		console.log('\nERROR: ' + error+'\n');
	  		res.redirect('back');
		} else {
			// Simple log to server, add proper UI response to user at res.
			// or add flash message to page https://www.npmjs.com/package/connect-flash 
	    	console.log(`\nRESPONSE SENT:\n`);
	    	console.log(info)
	  		res.redirect('back');
		}
	});

});

// Set which port your app will run on: PORT = open port on your server
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`App is running on port: ${port}`);
})














