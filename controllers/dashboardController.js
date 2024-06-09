module.exports.getdata = async (req,res)=>{

    try{
        var sql = require("mssql");
        var request = new sql.Request();
        const q1 = await request.query("SELECT SUM(SubTotal) AS TotalSubTotal FROM OrderDetail;")
        console.log(q1.recordset[0].TotalSubTotal)
        const q2 = await request.query("SELECT SUM(SubTotal) AS TotalSubTotal FROM PurchaseOrderDetail;")
        console.log(q2.recordset[0].TotalSubTotal)
        const q3 = await request.query("SELECT COUNT(*) AS NumberOfItems FROM Item;")
        console.log(q3.recordset[0].NumberOfItems)
        const q4 = await request.query("SELECT TOP 1 o.ItemID, i.ItemName, SUM(o.SubTotal) AS TotalSubTotal FROM OrderDetail o INNER JOIN Item i ON o.ItemID = i.ItemID GROUP BY o.ItemID, i.ItemName ORDER BY TotalSubTotal DESC;")
        console.log(q4.recordset[0])
        return res.status(200).json({success: true , sales:q1.recordset[0].TotalSubTotal ,  expense : q2.recordset[0].TotalSubTotal , totalitems : q3.recordset[0].NumberOfItems , topseller : q4.recordset[0].ItemName })
    // });
 }catch(e){
    console.log(e)
    return res.status(400).json({success: false })
 }
 };

 module.exports.getgraph = async(req,res)=>{

    console.log("in getgraph ")
    try{
        var sql = require("mssql");
        var request = new sql.Request();
        request.query("SELECT MONTH(CONVERT(DATE, O.Date, 105)) AS OrderMonth,YEAR(CONVERT(DATE, O.Date, 105)) AS OrderYear,SUM(D.SubTotal) AS TotalAmount FROM OrderDetail AS D INNER JOIN OrderTable AS O ON D.OrderID = O.OrderID GROUP BY YEAR(CONVERT(DATE, O.Date, 105)),MONTH(CONVERT(DATE, O.Date, 105)) ORDER BY OrderYear, OrderMonth;",function(e,recordset){
         console.log(recordset)
         res.send(recordset)
        });
 
    // });
 }catch(e){
    console.log(e)
    return res.status(400).json({success: false })
 }
 };

 module.exports.getingbyqty = async(req,res)=>{

   console.log("in getingbyqty ")
   try{
       var sql = require("mssql");
       var request = new sql.Request();
       request.query("SELECT TOP 9 I.[image], SUM(POD.Quantity) AS TotalQuantityOrdered FROM PurchaseOrderDetail POD INNER JOIN Ingredient I ON POD.IngredientID = I.IngredientID GROUP BY I.[image] ORDER BY TotalQuantityOrdered DESC;",function(e,recordset){
        console.log(recordset)
        res.send(recordset)
       });

   // });
}catch(e){
   console.log(e)
   return res.status(400).json({success: false })
}
};


module.exports.getitemindesc = async(req,res)=>{

   console.log("in getitem ")
   try{
       var sql = require("mssql");
       var request = new sql.Request();
      request.query("SELECT TOP 9 o.ItemID, i.ItemName,i.image, SUM(o.SubTotal) AS TotalSubTotal FROM OrderDetail o INNER JOIN Item i ON o.ItemID = i.ItemID GROUP BY o.ItemID, i.ItemName , i.[image] ORDER BY TotalSubTotal DESC;",function(e,recordset){
        console.log(recordset)
        res.send(recordset)
       });

   // });
}catch(e){
   console.log(e)
   return res.status(400).json({success: false })
}
};



 