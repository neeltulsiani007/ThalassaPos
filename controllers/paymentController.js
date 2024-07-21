module.exports.order = async (req,res)=>{
    const express = require("express");
    const Razorpay = require("razorpay");
    const cors = require("cors");
    const crypto = require("crypto");
    require("dotenv").config();

    console.log("in order controller")
    try {
        const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = req.body;
        const order = await razorpay.orders.create(options);
        console.log(order)

        if (!order) {
        return res.status(500).send("Error");
        }

        return res.status(200).json({order: order})
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
 };

 module.exports.validate = async (req,res)=>{
  console.log("in validate controller")
  console.log(req.body)


    console.log(req.body.razorpay_order_id , req.body.razorpay_payment_id , req.body.razorpay_signature)

  // const crypto = require("crypto")
  // const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  // //order_id + "|" + razorpay_payment_id
  // sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  // const digest = sha.digest("hex");
  // console.log(digest)
  // console.log(razorpay_signature)
  // if (digest !== razorpay_signature) {
  //   return res.status(400).json({ msg: "Transaction is not legit!" });
  // }

  return res.status(200).json({ msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,})
 };