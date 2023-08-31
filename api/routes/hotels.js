const express=require("express");
const {createHotel, updateHotel}=require("../controllers/HotelController/hotelCreate")
const router=express.Router();
router.post("/create", createHotel )
router.put("/update/:id", updateHotel )

module.exports=router;