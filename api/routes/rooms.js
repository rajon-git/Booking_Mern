const express=require("express");
const {createRoom,updateRoom,updateRoomAvailability,deleteRoom, getRoom}=require("../controllers/RoomController/room")
const { verifyAdmin } =require ("../utils/verifyToken");
const router=express.Router();
router.post("/:hotelid",verifyAdmin, createRoom)
router.put("/:id",verifyAdmin,updateRoom)
router.put("/availability/:id", updateRoomAvailability)
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom)
router.get("/:id",getRoom)

module.exports=router;