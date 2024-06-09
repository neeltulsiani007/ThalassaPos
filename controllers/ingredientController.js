module.exports.getingredients = async (req,res)=>{

    var sql = require("mssql");
    var request = new sql.Request();
try {
 const ing = await request.query("SELECT DISTINCT IngredientName ,  IngredientPrice ,IngredientCategory,image  FROM ingredient")   
 res.send({ing : ing.recordset})
} catch (e) {
    console.log(e)
    return res.status(400).json({success: false })
}
};


module.exports.getingredientsbytitle = async (req,res)=>{

    console.log("here in gibyt")
    var sql = require("mssql");
    var request = new sql.Request();
    try{
    console.log(req.params.title)
    const title = req.params.title
    request.input('cid', sql.VarChar, title);
     request.query("select * from Ingredient where IngredientName = @cid",function(err,recordset){
        if (err) console.log(err)
        console.log(recordset)
        res.send(recordset);
    })
   
} catch (e) {
    console.log(e)
    return res.status(400).json({success: false })
}

};


module.exports.orderingredients = async (req,res)=>{

    console.log("in ordering")
    var sql = require("mssql");
    var request = new sql.Request();
    console.log(req.body)
    const ingname = req.body.ingname
    const quantity = req.body.quantity
    var request = new sql.Request();
    var cashierid = req.cashierid
    const orderid = Math.floor(Math.random() * 10000000);
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
    const year = currentDate.getFullYear();
    const date = `${day}-${month}-${year}`;

    request.input('ingname', sql.VarChar, ingname);
    request.input('cashierid', sql.Int, cashierid);
    request.input('quantity', sql.Int, quantity);

    
    try {
        const q = await request.query("update Ingredient set CurrentStock = CurrentStock + @quantity where IngredientName = @ingname") 
        // const new = await request.query("insert")
        const getinginfo = await request.query("select * from Ingredient where IngredientName = @ingname")
        console.log(getinginfo.recordset)

        const subtotal = getinginfo.recordset[0].IngredientPrice*quantity
        const ingid = getinginfo.recordset[0].IngredientID
        console.log(subtotal , ingid)

        request.input('subtotal', sql.Int, subtotal);
        request.input('ingid', sql.Int, ingid);
        request.input('orderid', sql.Int, orderid);
        request.input('date', sql.VarChar, date);

         const t = await request.query("insert into PurchaseOrderDetail values(@orderid,@ingid,@quantity,@subtotal,@cashierid,@date,NULL)")
 

        return res.status(200).json({success: true })

    } catch (e) {
        console.log(e)
        return res.status(400).json({success: false })
    }
  
 };



module.exports.filteringredients = async (req,res)=>{
    try{
       console.log(req.body)
       const ingname = req.body.ingname 
        var sql = require("mssql");
        var request = new sql.Request();

        ing = ingname + '%'
        request.input('ingname', sql.VarChar, ing);
        if(ingname !== '')
       {
        request.query("SELECT DISTINCT IngredientName ,  IngredientPrice ,IngredientCategory,image  FROM ingredient where IngredientName LIKE @ingname ",function(e,recordset){
       res.send(recordset)
        })
       }
       else
       {
          request.query("SELECT DISTINCT IngredientName ,  IngredientPrice ,IngredientCategory,image  FROM ingredient",function(e,recordset){
             res.send(recordset)
              })
       }
  
 
 }catch(e){
    console.log(e)
    return res.status(400).json({success: false })
 }
 };

