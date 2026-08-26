import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order from frontend
const placeOrder = async (req, res) => {
    //React frontend port change dynamically while preserving Stripe integration
   const dynamicFrontendUrl = req.headers.origin || req.get('origin') || "http://localhost:3000";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity

        }))

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        })


        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${dynamicFrontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${dynamicFrontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}


const verifyOrder = async (req,res) =>{
const {orderId,success} = req.body;
try {
    if(success=="true"){
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"Paid"})
    }
    else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"Not Paid"})
    }
} catch (error) {
    console
}
}

//user orders for frontend
const userOrders = async (req,res) =>{
try {
    const userId = req.body?.userId || req.userId;
    if(!userId){
        return res.json({success:true,message:"User ID missing invalid token"});
    }
    const orders = await orderModel.find({userId:userId});
    res.json({success:true, data:orders})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}


export { placeOrder,verifyOrder,userOrders}