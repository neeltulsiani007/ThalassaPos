
module.exports = async (email, subject, cashierid) => {

    const path = require('path')
	var hbs = require('nodemailer-express-handlebars');

	const nodemailer = require("nodemailer");
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth:{
				user: "neeltulsiani007@gmail.com",
				pass: "krovkyocagzxzkvu"
			},
		});

		const handlebarOptions = {
			viewEngine: {
			  extName: ".handlebars",
			  partialsDir: path.resolve('./views'),
			  defaultLayout: false,
			},
			viewPath: path.resolve('./views'),
			extName: ".handlebars",
		  }

		transporter.use('compile', hbs(handlebarOptions));
		
  
		await transporter.sendMail({
			from: "neeltulsiani007@gmail.com",
			to: email,
			subject: subject,
			// text: text,
			template: 'email',
			context: {
				
				cashierid:cashierid
			  }
		});
		console.log("email sent successfully");
		return true;
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return false;
		
	}
};


