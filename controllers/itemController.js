
module.exports.getitems = async (req,res)=>{

   try{
    console.log(req.params.title)
    const cname = req.params.title;
       var sql = require("mssql");
       var request = new sql.Request();
       request.input('cid', sql.VarChar, cname);
        await request.query("select * from Item INNER JOIN Category ON Item.CategoryID = Category.CategoryID where Category.CategoryName = @cid",function(err,recordset){
            if (err) console.log(err)
            res.send(recordset);
        })
           
           
   // });
}catch(e){
   console.log(e)
   return res.status(400).json({success: false })
}
};


module.exports.getfooditems = async (req,res)=>{

    try{
     console.log(req.params.title)
     const cname = req.params.title;
        var sql = require("mssql");
        var request = new sql.Request();
        request.input('cid', sql.VarChar, cname);
         await request.query("select * from Item INNER JOIN Category ON Item.CategoryID = Category.CategoryID where ItemName = @cid",function(err,recordset){
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

module.exports.replenish = async (req,res)=>{
   try{
      console.log(req.body)
      const item = req.body.item
       var sql = require("mssql");
       var request = new sql.Request();
       request.input('item', sql.Int, item);
       const r = await request.query("select * from Ingredient where ItemID = @item")
       console.log(r.recordset)
       var req= 1000000
       for(let i =0;i<r.recordset.length;i++)
       {
          req  = Math.min(req,r.recordset[i].CurrentStock/r.recordset[i].Requirement)
       }
       request.input('req', sql.Int, req);
       console.log("Updated amount is "+req)
       const u = await request.query("update Item set CurrentStock = CurrentStock + @req where ItemID = @item",{fireTriggers:true})
       return res.status(200).json({success: true })

}catch(e){
   console.log(e)
   return res.status(400).json({success: false })
}
};

module.exports.filteritems = async (req,res)=>{
   try{
      console.log(req.body)
      const ingname = req.body.ingname 
      const cname = req.params.title;
       var sql = require("mssql");
       var request = new sql.Request();
       request.input('cid', sql.VarChar, cname);
       ing = ingname + '%'
       request.input('ingname', sql.VarChar, ing);
       if(ingname !== '')
      {
       request.query("select * from Item INNER JOIN Category ON Item.CategoryID = Category.CategoryID where Category.CategoryName = @cid and ItemName LIKE @ingname",function(e,recordset){
      res.send(recordset)
       })
      }
      else
      {
         request.query("select * from Item INNER JOIN Category ON Item.CategoryID = Category.CategoryID where Category.CategoryName = @cid",function(e,recordset){
            res.send(recordset)
             })
      }
 

}catch(e){
   console.log(e)
   return res.status(400).json({success: false })
}
};