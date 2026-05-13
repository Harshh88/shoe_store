const {createBooking,confirmBooking,completeBooking,getBookings} = require("../services/booking.service");
const {getSingleShop} = require("../services/shop.service");

const addBookings = async(req,res) => {
    try{
        const {id:user_id} = req.user;
        const {shop_id,booking_datetime} = req.body;
        if(!shop_id || !booking_datetime){
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            })
        }
        const result = await createBooking({user_id,shop_id,booking_datetime});
        if(!result){
            return res.status(400).json({
                success: false,
                message: "booking failed"
            })
        }
        res.status(200).json({
            success: true,
            message: "booking successfull",
            booking_data: result
        })
    }
    catch(err){
        console.log("something is error in booking controller",err);
        return res.status(500).json({
            success: false,
            message: "internal error"
        })
    }
}

const sellerConfirmBooking = async(req,res) => {
    const {id} = req.body;
    try{
        await confirmBooking(id);
        res.status(200).json({
            message:"status confirm successfully"
        })
    }
    catch(err){
        console.log("err in sellerConfirmationBooking ",err);
        return res.status(err.status || 500).json({
            message: err.message
        })
    }
}

const sellerCompleteBooking = async(req,res) => {
    const {id} = req.body;
    try{
        await completeBooking(id);
        res.status(200).json({
            message: "status completed successfully"
        })
    }catch(err){
        console.log(err in sellerCompleteBooking,err);
        return res.status(err.status || 500).json({
            message:err.message
        })
    }
}

const getUserBookings = async(req,res) => {
    const seller_id = req.user.id;
    console.log(seller_id);
    try{
        const getAllBookings = await getBookings(seller_id);
        // console.log(getAllBookings);
        res.status(200).json({
            getAllBookings
        })
    }
    catch(err){
        console.log("something is error in getUserBookings function",err);
        return res.status(err.status || 500).json({
            message: err.message
        })
    }
}

const getBookingShop = async(req,res) => {
    const {shop_id} = req.params;
    try{
       const shop = await getSingleShop({shop_id});
       console.log(shop); 
       res.status(200).json({
        shop: shop.rows[0]
       })
    }catch(err){
        console.log(err);
        return res.status(err.status || 500).json({
            message: err.message
        })
    }
}

module.exports = {addBookings,sellerConfirmBooking,sellerCompleteBooking,getUserBookings,getBookingShop};