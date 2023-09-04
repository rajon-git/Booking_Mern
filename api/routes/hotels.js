const express=require("express");
const {createHotel,updateHotel,getHotelRooms,countByType,countByCity,getHotels,getHotel,deleteHotel}=require("../controllers/HotelController/hotelCreate")
const {verifyAdmin} =require("../utils/verifyToken")
const router=express.Router();


router.post("/",verifyAdmin, createHotel )
router.put("/:id",verifyAdmin, updateHotel )

router.delete("/:id", verifyAdmin, deleteHotel);
//GET

router.get("/find/:id", getHotel);
//GET ALL

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

module.exports=router;