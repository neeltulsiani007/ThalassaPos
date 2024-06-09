module.exports.checkuserexists = async(req,res) =>{
    console.log("in cue")

    var sql = require("mssql");
    var request = new sql.Request();
    const jwt = require("jsonwebtoken")
    const bcrypt = require('bcrypt')
    require('dotenv').config();
    console.log(req.body)
    const {cashierid,password } = req.body
    try{
        request.input('cashierid', sql.Int, cashierid);
        request.input('password', sql.VarChar, password);

      const user = await request.query("select * from Cashier  where CashierID = @cashierid")
      console.log(user.recordset[0])

      if (user.recordset[0]){
        console.log("Cashier")
        if ( await bcrypt.compare(password,user.recordset[0].Password)){
          const accessToken = jwt.sign({
            "cashierid" : user.recordset[0].CashierID
          },
          process.env.ACCESS_TOKEN_SECRET,
          {expiresIn : '30m'}
          );
           console.log(accessToken)
          const refreshToken = jwt.sign({
            "cashierid" : user.recordset[0].CashierID
          },
          process.env.REFRESH_TOKEN_SECRET,
          {expiresIn : '1d'}
          );
          request.input('refreshtoken', sql.VarChar, refreshToken);
          await request.query("update Cashier set refreshtoken = @refreshtoken  where CashierID = @cashierid")
          // res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
          res.cookie('jwt', refreshToken , {maxAge: 24 * 60 * 60 * 1000 , httpOnly:true  , secure:true});
  
           res.json({accessToken ,typeuser: "cashier",success:true});
        }
        else
        { 
          return res.status(200).json({success: false,});
        }
      }
      else
        { 
          return res.status(200).json({success: false,});
        }

    }catch(e){
        console.log(e)
      return res.status(500).json({e})
    }
  }


  module.exports.insertcashier = async (req,res)=>{
    console.log(req.body)
    const sendemail= require('../controllers/emailController')
   const un = req.body.username;
   const fname = req.body.fname;
   const lname = req.body.lname;
   const email = req.body.email;
   const password = req.body.password;
   const cid = Math.floor(Math.random() * 10000000);
   console.log(cid)
   try{
       var sql = require("mssql");
       const bcrypt = require("bcrypt");
       var request = new sql.Request();
       const hashedpassword = await bcrypt.hash(password,10);
       request.input('fname', sql.VarChar, fname);
       request.input('email', sql.VarChar, email);
       request.input('password', sql.VarChar, hashedpassword);
       request.input('lname', sql.VarChar, lname);
       request.input('username', sql.VarChar, un);
       request.input('cid', sql.Int, cid);
       const username = await request.query("Select * from Cashier where username = @username")
       const useremail = await request.query("Select * from Cashier where email = @email")
      
        if(username.recordset[0])
        {
            return res.status(200).json({success: false})
        }
        else if(useremail.recordset[0]){
            return res.status(200).json({success: false})
        }
        else
        {
         request.query("insert into Cashier(Username,FirstName,LastName,email,password,CashierID) values (@username,@fname,@lname,@email,@password,@cid)",
       function (err, recordset) {
           
           if (err) console.log(err)
           return res.status(200).json({success: true , cashierid:cid , record:recordset , email:email})
           
       });
   // });
    }
}catch(e){
   console.log(e)
}
};