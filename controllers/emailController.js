module.exports.sendemail = async (req,res)=>{
    console.log("in sendemail")
    var sql = require("mssql");
    var request = new sql.Request();
    const sendEmail = require("../sendEmail");
    console.log(req.body)
   const cashierid = req.body.CashierID;
   request.input('cid', sql.Int, cashierid);
   var email = req.body.email;

   try{
    console.log(cashierid)
    console.log(email)
		const e = await sendEmail(email, "Cashier ID", cashierid);
        if(e)
        {
		res
		.status(201)
		.send({ message: "An Email sent to your account please verify" ,success:true});
        }
        else
        {
         res
		.status(201)
		.send({ message: "Invalid Email" , success:false });
        }

   }catch(e)
   {
    console.log(e);
	res.status(500).send({ message: "Internal Server Error" });
   }
	}

    module.exports.verifyemail = async (req, res) => {
        try {      
            console.log("inside verifyemail")
            var sql = require("mssql");
            var request = new sql.Request();
            const cashierid = req.params.CashierID;
            const token = req.params.token;
            request.input('cid', sql.Numeric, cashierid);
            request.input('token',sql.VarChar,token);
             console.log(token)
             const user = await request.query("Select * from Cashier  where CashierID = @cid and refreshtoken = @token")

            if(user.recordset[0])
            {
            console.log("inside user")
              await request.query("update Cashier set verified = 'true' where CashierID = @cid " )
              res.status(200).send({ message: "Email verified successfully" ,success:true});
            }
            else
            {
               console.log("Error")
                res.status(200).send({ message: "Email verification failed" , success:false });
            }
            
        } catch (error) {
            res.status(500).send({ message: "Internal Server Error" ,success:false });
        }
    }
    
