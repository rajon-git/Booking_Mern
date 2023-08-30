const express=require("express");
const {createHotel}=require("../controllers/HotelController/hotelCreate")
const router=express.Router();
router.post("/create", createHotel )

module.exports=router;