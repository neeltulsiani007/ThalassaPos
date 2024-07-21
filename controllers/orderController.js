module.exports.selectorder = async (req,res)=>{

    console.log("in selectedorder")
    var sql = require("mssql");
    var request = new sql.Request();
    console.log(req.body)
    const itemid = req.body.itemid
    const quantity = req.body.quantity
    const price = req.body.price
    var request = new sql.Request();
    request.input('itemid', sql.Int, itemid);
    request.input('quantity', sql.Int, quantity);
    request.input('price', sql.Decimal, price);
    
    try {
        const q = await request.query("select * from Item where ItemId = @itemid") 
        console.log("stock is "+q.recordset[0].CurrentStock)
        if(quantity <= q.recordset[0].CurrentStock){
       const q1 = await request.query("update Item set selectedquantity = @quantity where ItemID = @itemid")
       const q2 = await request.query("select * from Cart where ItemId = @itemid")
       if(q2.recordset[0])
       {
         request.query("update Cart set quantity = @quantity where ItemID = @itemid",function(e,recordset){
            if(e){console.log(e)}
        })
       }
       else
       {
         request.query("insert into Cart values(@itemid,@price,@quantity)",function(e,recordset){
            if(e){console.log(e)}
         })
       }
       return res.status(200).json({success: true })
    }
    else
    {
        return res.status(200).json({success: false , allowed : q.recordset[0].CurrentStock })
    }

    } catch (e) {
        console.log(e)
        return res.status(400).json({success: false })
    }
  
 };

 module.exports.getcart = async (req,res)=>{

    console.log("in getcart")
    var sql = require("mssql");
    var request = new sql.Request();
    try {

     request.query("SELECT * FROM Cart AS o INNER JOIN Item AS od ON o.ItemID = od.ItemID INNER JOIN Category AS i ON od.CategoryID = i.CategoryID;",function(e,recordset){
            if(e){console.log(e)}
            res.send(recordset)
        })

    } catch (e) {
        console.log(e)
        return res.status(400).json({success: false })
    }
  
 };

 module.exports.deletefromcart = async (req,res)=>{

    console.log("in deletefromcart")
    var sql = require("mssql");
    var request = new sql.Request();
    console.log(req.body)
    const itemid = req.body.itemid[0]
    request.input('itemid', sql.Int, itemid);
    try {

     request.query("delete FROM Cart where ItemID = @itemid;",function(e,recordset){
            if(e){console.log(e)}
        })
        request.query("update Item set selectedquantity = 0 where ItemID = @itemid;",function(e,recordset){
            if(e){console.log(e)}
        })

        return res.status(200).json({success: true })

    } catch (e) {
        console.log(e)
        return res.status(400).json({success: false })
    }
  
 };




 module.exports.generatebill = async (req,res)=>{

    console.log("in generatebill")
    var sql = require("mssql");
    var request = new sql.Request();
    console.log(req.body)
    const input = req.body.input
    const orderid = req.body.orderid;
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
    const year = currentDate.getFullYear();
    const date = `${day}-${month}-${year}`;
    var totalamount = 0;
    console.log(input)
    try {
        request.input('orderid', sql.VarChar, orderid);
        request.input('name', sql.VarChar, input.name);
        request.input('cashierid', sql.VarChar, input.cashierid);
        request.input('number', sql.Numeric, input.number);
        request.input('date', sql.VarChar, date);

        const q = await request.query("select * FROM Cart;",)
        console.log(q.recordset)

        const table = new sql.Table('OrderDetail');
         table.create = false; // table already exists
         table.columns.add('OrderID', sql.VarChar, { nullable: true });
         table.columns.add('ItemID', sql.Int, { nullable: true });
         table.columns.add('Quantity', sql.Int, { nullable: true });
         table.columns.add('SubTotal', sql.Int, { nullable: true });

        for(let i=0;i<q.recordset.length;i++)
        {
            totalamount+=q.recordset[i].TotalPrice
            table.rows.add(orderid ,q.recordset[i].ItemID ,q.recordset[i].quantity,q.recordset[i].TotalPrice)
        }
        request.query("insert into OrderTable values(@orderid,@date,@total,@cashierid,@name,@number);",function(e,recordset){
            if(e){console.log(e)}
        })

        request.bulk(table, { keepIdentity: true, checkConstraints: true, fireTriggers: true });
        
        console.log(totalamount)
            request.input('total', sql.Int, totalamount);
        request.query("update Item set selectedquantity = 0;",function(e,recordset){
            if(e){console.log(e)}
        })
        request.query("delete from Cart;",function(e,recordset){
            if(e){console.log(e)}
        })


        return res.status(200).json({success: true , orderid:orderid })

    } catch (e) {
        console.log(e)
        return res.status(400).json({success: false })
    }
  
 };


 module.exports.getbill = async (req,res)=>{

    console.log("in getbill")
    console.log(req.params.orderid)
     const orderid = req.params.orderid;
        var sql = require("mssql");
        var request = new sql.Request();
        request.input('orderid', sql.VarChar, orderid);
    try {

     request.query("SELECT * FROM OrderDetail AS o INNER JOIN OrderTable AS od ON o.OrderID = od.OrderID INNER JOIN Item AS i ON o.ItemID = i.ItemID where od.OrderID = @orderid;",function(e,recordset){
            if(e){console.log(e)}
            res.send(recordset)
        })

    } catch (e) {
        console.log(e)
        return res.status(400).json({success: false })
    }
  
 };

 module.exports.getorders = async (req,res)=>{

        var sql = require("mssql");
        var request = new sql.Request();
    try {


     const ot = await request.query("select * from OrderTable")   
     const od = await request.query("SELECT * FROM OrderDetail AS o INNER JOIN Item AS od ON o.ItemID = od.ItemID INNER JOIN Category AS i ON od.CategoryID = i.CategoryID;")

     res.send({ot : ot.recordset , od : od.recordset})
          

    } catch (e) {
        console.log(e)
        return res.status(400).json({success: false })
    }
  
 };