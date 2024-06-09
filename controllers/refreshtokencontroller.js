module.exports.handleRefreshtoken =  async(req,res) =>{

    var sql = require("mssql");
    var request = new sql.Request();
    const jwt = require("jsonwebtoken")
    require('dotenv').config();
    const cookies = req.cookies;
    try{
      if(!cookies?.jwt)
      {
        console.log("no cookies")
        return res.sendStatus(401);
      }
      //  console.log(cookies.jwt);
       const refreshToken = cookies.jwt;
       request.input('refreshtoken', sql.VarChar, refreshToken);
       const user = await request.query("Select * from Cashier  where refreshtoken = @refreshtoken")


       if(!user.recordset[0])
       {
        console.log("error in rtc")
        return res.sendStatus(403)
       }
       jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) =>{
            //console.log(decoded.name)
            if(err)
            {
              console.log("error in rtc2")
                return res.sendStatus(403)
            }
            if(user.recordset[0]){
            const accessToken = jwt.sign({
                "cashierid" : user.recordset[0].CashierID,
              },
              process.env.ACCESS_TOKEN_SECRET,
              {expiresIn : '30s'}
              );
              res.json({accessToken})
            }
        }
       );
 
    }catch(e){
      return res.status(500).json({e})
    }
  }