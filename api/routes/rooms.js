const express=require("express");
const {createRoom,updateRoom}=require("../controllers/RoomController/room")
const { verifyAdmin } =require ("../utils/verifyToken");
const router=express.Router();
router.post("/:hotelid",verifyAdmin, createRoom)
router.put("/:id",verifyAdmin,updateRoom)

module.exports=router;