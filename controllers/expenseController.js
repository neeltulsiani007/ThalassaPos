module.exports.getexpenses = async (req,res)=>{

    try{
        var sql = require("mssql");
        var request = new sql.Request();
         await request.query("select * from PurchaseOrderDetail as p LEFT JOIN Ingredient as i ON p.IngredientID = i.IngredientID ",function(err,recordset){
             if (err) console.log(err)
             console.log(recordset)
             res.send(recordset);
         })
    // });
 }catch(e){
    console.log(e)
    return res.status(400).json({success: false })
 }
 };

 module.exports.getcashiers = async (req,res)=>{

    try{
        var sql = require("mssql");
        var request = new sql.Request();
         await request.query("select * from Cashier ",function(err,recordset){
             if (err) console.log(err)
             console.log(recordset)
             res.send(recordset);
         })
    // });
 }catch(e){
    console.log(e)
    return res.status(400).json({success: false })
 }
 };

 module.exports.filterexpense = async (req,res)=>{

    try{
        var sql = require("mssql");
        var request = new sql.Request();
        console.log(req.body)
        const {invoice  , startdate , enddate , cid , ingname} = req.body
        inv = invoice +'%'
        const ingrename = ingname +'%'
        request.input('inv', sql.VarChar,inv);
        request.input('sdate', sql.VarChar,startdate);
        request.input('edate', sql.VarChar,enddate);
        request.input('ingname', sql.VarChar,ingrename);
        const cashid = cid+'%'
        request.input('cid', sql.VarChar,cashid);

        let query = 'select * from PurchaseOrderDetail as p LEFT JOIN Ingredient as i ON p.IngredientID = i.IngredientID  WHERE 1=1';

        // Check and append filters
        if (invoice !== '') {
            query += ' AND p.PurchaseOrderID LIKE @inv';
        }

        if (cid !== ''){
            query += ' AND p.CashierID LIKE @cid';
        }

        if (ingname !== '') {
            query += ' AND i.IngredientName LIKE @ingname';
        }

        if (startdate !== '' && enddate !== '') {
            query += ' AND CONVERT(DATE,Date, 103) BETWEEN @sdate AND @edate';
        }
        if (startdate !== '' && enddate == '') {
            query += ' AND CONVERT(DATE,Date, 103) >= @sdate';
        }
        if (startdate == '' && enddate !== '') {
            query += ' AND CONVERT(DATE,Date, 103) <= @edate';
        }

        console.log(query)

        request.query(query,function(e,recordset){
            if(e) console.log(e)
            console.log(recordset)
            res.send(recordset)
        })

        
    // });
 }catch(e){
    console.log(e)
    return res.status(400).json({success: false })
 }
 };



 module.exports.addexpense = async (req,res)=>{
    console.log(req.body)
    const{cid , amt , quantity , des} = req.body
    console.log(req)
    if(parseInt(cid) === req.cashierid){
    try{
       var sql = require("mssql");
       var request = new sql.Request();
       request.input('cid', sql.Int, cid);
       request.input('des', sql.VarChar, des);
       request.input('quan', sql.VarChar, quantity);
       request.input('amt', sql.VarChar, amt);
       const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
        const year = currentDate.getFullYear();
        const date = `${day}-${month}-${year}`;
        const orderid = Math.floor(Math.random() * 10000000);
        request.input('date', sql.VarChar, date);
        request.input('orderid', sql.Int, orderid);

        if(quantity !== "none"){
       const t = await request.query("insert into PurchaseOrderDetail(PurchaseOrderID , Quantity , SubTotal ,CashierID , Date , Description) values(@orderid,@quan,@amt,@cid,@date,@des)")
        }
        else
        {
            const t = await request.query("insert into PurchaseOrderDetail(PurchaseOrderID  , SubTotal ,CashierID , Date , Description) values(@orderid,@amt,@cid,@date,@des)")
        }

       request.query('select * from PurchaseOrderDetail as p LEFT JOIN Ingredient as i ON p.IngredientID = i.IngredientID  WHERE 1=1' , function(e,recordset)
       {
        res.send(recordset)
       })
    
   // });
    

}catch(e){
   console.log(e)
}
    }
    else
    {
        return res.status(400).json({success: false})
    }
};